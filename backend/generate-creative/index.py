import json
import os
import base64
import requests
from typing import Dict, Any
import uuid

def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''API для генерации креативов через Gemini 2.5 Flash Image'''
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

        # Используем Pollinations.ai - бесплатный API для генерации изображений
        from urllib.parse import quote
        
        # Определяем размеры по aspect ratio
        sizes = {
            '1:1': (1024, 1024),
            '9:16': (768, 1344),
            '16:9': (1344, 768)
        }
        width, height = sizes.get(aspect_ratio, (1024, 1024))
        
        # Формируем безопасный URL-encoded промпт
        safe_prompt = quote(prompt)
        seed = uuid.uuid4().int % 1000000
        
        # URL для генерации через Pollinations.ai
        image_url = f"https://image.pollinations.ai/prompt/{safe_prompt}?width={width}&height={height}&seed={seed}&nologo=true&enhance=true&model=flux"
        
        # Скачиваем изображение
        response = requests.get(image_url, timeout=60)
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Failed to generate image',
                    'status': response.status_code
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