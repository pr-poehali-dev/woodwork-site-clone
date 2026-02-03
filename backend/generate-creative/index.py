import json
import os
import base64
import requests
from typing import Dict, Any

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
        
        # Вызов Gemini API для генерации изображения
        if proxy_url:
            # Используем прокси - добавляем http:// если не указано
            if not proxy_url.startswith('http'):
                proxy_url = f"http://{proxy_url}"
            gemini_url = f"{proxy_url}/v1beta/models/imagen-3.0-generate-001:generate?key={gemini_key}"
        else:
            # Прямой доступ
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generate?key={gemini_key}"
        
        payload = {
            "prompt": prompt,
            "number_of_images": 1,
            "aspect_ratio": aspect_ratio,
            "safety_filter_level": "block_only_high",
            "person_generation": "allow_all"
        }

        response = requests.post(
            gemini_url,
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=60
        )

        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Failed to generate image',
                    'details': response.text
                })
            }

        result = response.json()
        
        # Извлекаем base64 изображение
        if 'generatedImages' in result and len(result['generatedImages']) > 0:
            image_data = result['generatedImages'][0].get('image', '')
            
            # Сохраняем в S3
            import boto3
            
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )

            # Декодируем base64
            image_bytes = base64.b64decode(image_data)
            
            # Генерируем уникальное имя файла
            import uuid
            file_name = f"creatives/{uuid.uuid4()}.jpg"
            
            # Загружаем в S3
            s3.put_object(
                Bucket='files',
                Key=file_name,
                Body=image_bytes,
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
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No image generated'})
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