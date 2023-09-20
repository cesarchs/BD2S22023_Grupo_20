import requests

url = 'https://id.twitch.tv/oauth2/token'
payload = {
    'client_id': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
    'client_secret': 'q3zwwneft7z3i4eqrmkp1r5s4q80ff',
    'grant_type': 'client_credentials'
}

response = requests.post(url, data=payload)
data = response.json()

access_token = data.get('access_token')

print (access_token )