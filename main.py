from PIL import Image

import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\SharabhCode\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

print(pytesseract.image_to_string(Image.open('credits.png')))