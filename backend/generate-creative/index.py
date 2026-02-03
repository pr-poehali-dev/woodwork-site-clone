import json
import os
import base64
import requests
from typing import Dict, Any
import uuid

def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''API для генерации креативов через Gemini 2.5 Flash Image (Nano Banana)'''
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

        proxy_url = os.environ.get('GEMINI_PROXY_URL', '').strip()
        
        gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"
        
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "response_modalities": ["Text", "Image"]
            }
        }

        proxies = None
        if proxy_url:
            if not proxy_url.startswith('http'):
                proxy_url = f"http://{proxy_url}"
            proxies = {'http': proxy_url, 'https': proxy_url}

        headers = {
            'Content-Type': 'application/json',
            'x-goog-api-key': gemini_key
        }

        response = requests.post(gemini_url, headers=headers, json=payload, proxies=proxies, timeout=90)
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Gemini API error', 'status': response.status_code, 'details': response.text[:500]})
            }

        result = response.json()
        
        if 'candidates' in result and len(result['candidates']) > 0:
            for part in result['candidates'][0].get('content', {}).get('parts', []):
                if 'inlineData' in part:
                    image_data = part['inlineData']['data']
                    image_bytes = base64.b64decode(image_data)
                    
                    import boto3
                    s3 = boto3.client('s3',
                        endpoint_url='https://bucket.poehali.dev',
                        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
                    )

                    file_name = f"creatives/{uuid.uuid4()}.jpg"
                    s3.put_object(Bucket='files', Key=file_name, Body=image_bytes, ContentType='image/jpeg')
                    
                    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_name}"
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'imageUrl': cdn_url, 'prompt': prompt, 'aspectRatio': aspect_ratio})
                    }
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'No image in response', 'response': str(result)[:500]})
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