#!/usr/bin/env python
from urllib import request, parse
import urllib
import base64
import json

URL = 'https://anshulmie.webchartnow.com/webchart.cgi?'
USERNAME = 'abroa01'
PASSWORD = '$K@ter0707'
COOKIE = None

if __name__ == '__main__':
    print('Initializing session')
    try:
        login_data = {
            'login_user': USERNAME,
            'login_passwd': PASSWORD
        }
        data = parse.urlencode(login_data).encode()
        req = request.Request(URL, data=data)
        out = request.urlopen(req)
        COOKIE = out.headers.get('Set-Cookie').split('=')[1].split(';')[0]
    except Exception as e:
        print('Session failed to initialize {0}'.format(e))

    if COOKIE:
        requests = {
            'abbreviations response"': 'GET/db/abbreviations',
        }
        for title, url in requests.items():
            print('\nQuerying for patients: {0}'.format(title))
            params = {
                'f': 'json',
                'session_id': COOKIE,
                'apistring': base64.b64encode(url.encode()).decode()
            }
            data = parse.urlencode(params).encode()
            req = request.Request(URL, data=data)
            with request.urlopen(req) as response:
                js = json.load(response)
                print(json.dumps(js))
