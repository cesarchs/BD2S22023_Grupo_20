import requests

url = 'https://id.twitch.tv/oauth2/token'
payload = {
    'client_id': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
    'client_secret': 'atp5j3p2qsiracs1o2joqeg0efchnt',
    'grant_type': 'client_credentials'
}

response = requests.post(url, data=payload)
data = response.json()

access_token = data.get('access_token')

print (access_token )