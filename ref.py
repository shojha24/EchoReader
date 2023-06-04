from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
from flask_cors import CORS
import base64
import json
import os
from PIL import Image
from flask_cors import CORS, cross_origin
import numpy as np
import pytesseract
import random
from TTS.api import TTS

app = Flask(__name__)
app.config['CORS_HEADERS']='Content-Type'
CORS(app, expose_headers='Authorization')
run_with_ngrok(app)
app.debug=True

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\SharabhCode\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

model_name = TTS.list_models()[0]
tts = TTS(model_name)

@app.route("/get_img", methods = ['GET', 'POST'])
def recieve():
  data = request.get_json()

  images = data['images']
  indices = data['indices']

  print(images)
  print(indices)

  speechifying_this = ""

  for i in indices:
    string_bytes = bytes(str(images[i]), 'utf-8')

    path = f"img{i}.png"

    with open(path, "wb") as fh:
      fh.write(base64.decodebytes(string_bytes))
    
    img = Image.open(path)

    ocr = pytesseract.image_to_string(img)

    ocr = ocr.replace("\n", " ")

    speechifying_this += ocr

    print(speechifying_this)
  
  if len(speechifying_this) == 0:
    speechifying_this = "No text detected"

  file_path = f"reading_{random.randint(0, 100000)}.wav"

  tts.tts_to_file(text=speechifying_this, speaker=tts.speakers[1], language=tts.languages[0], file_path=file_path)

  with open(file_path, "rb") as fh:
    audio_data = base64.b64encode(fh.read()).decode('utf-8')

  files = {'audio': audio_data, 'text': speechifying_this}

  return files

  #text['audio'] = audio_data

  #return json.dumps(text)

@app.route("/test", methods = ['GET', 'POST'])
def test():
  data = request.get_json()
  return data


if __name__ == "__main__":
  app.run()