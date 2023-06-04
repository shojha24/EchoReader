import requests
import base64
import json

def convert_to_64(im_path):
    with open(im_path, "rb") as img_file:
        my_string = base64.b64encode(img_file.read()).decode('utf-8')
    return my_string

url = "http://bd17-69-119-107-111.ngrok-free.app/get_img"
response = requests.get(url, json={"images": [convert_to_64('credits.png')], "indices": [0]})



# i want to see what my response url looks like

"""
JSON format:
{
    "images": [insert_base64_encoded_image, insert_base64_encoded_image],
    "indices": [0, 1]
}
"""

jsonny = json.loads(response.content)

with open("audio.wav", "wb") as fh:
    fh.write(base64.decodebytes(bytes(jsonny['audio'], 'utf-8')))