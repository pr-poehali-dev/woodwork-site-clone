import json
import os
import base64
import requests
from typing import Dict, Any
import uuid

def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''API для генерации креативов через Gemini 2.5 Flash'''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body', '{}'))
        prompt = body.get('prompt', '')
        aspect_ratio = body.get('aspectRatio', '1:1')

        if not prompt:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Prompt is required'})
            }

        gemini_key = os.environ.get('GEMINI_API_KEY')
        if not gemini_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'GEMINI_API_KEY not configured'})
            }

        # Проверяем наличие прокси
        proxy_url = os.environ.get('GEMINI_PROXY_URL', '').strip()
        
        # Генерация через Pollinations API (бесплатно)
        # Формируем безопасный URL-encoded промпт
        from urllib.parse import quote
        safe_prompt = quote(prompt)
        
        # Определяем размеры по aspect ratio
        sizes = {
            '1:1': '1024x1024',
            '9:16': '768x1344',
            '16:9': '1344x768'
        }
        size = sizes.get(aspect_ratio, '1024x1024')
        
        # Используем Pollinations.ai API
        image_url = f"https://image.pollinations.ai/prompt/{safe_prompt}?width={size.split('x')[0]}&height={size.split('x')[1]}&seed={uuid.uuid4().int % 1000000}&nologo=true&enhance=true"
        
        # Настройка прокси для requests
        proxies = None
        if proxy_url:
            if not proxy_url.startswith('http'):
                proxy_url = f"http://{proxy_url}"
            proxies = {
                'http': proxy_url,
                'https': proxy_url
            }

        # Скачиваем изображение
        response = requests.get(image_url, proxies=proxies, timeout=60)
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Failed to generate image',
                    'details': f'Status: {response.status_code}'
                })
            }

        # Сохраняем в S3
        import boto3
        
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )

        # Генерируем уникальное имя файла
        file_name = f"creatives/{uuid.uuid4()}.jpg"
        
        # Загружаем в S3
        s3.put_object(
            Bucket='files',
            Key=file_name,
            Body=response.content,
            ContentType='image/jpeg'
        )
        
        # Формируем CDN URL
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'imageUrl': cdn_url,
                'prompt': prompt,
                'aspectRatio': aspect_ratio
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
