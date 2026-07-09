from PIL import Image
import sys

def crop_center(img_path):
    img = Image.open(img_path)
    width, height = img.size
    
    crop_amount = int(width * 0.12)
    box = (crop_amount, crop_amount, width - crop_amount, height - crop_amount)
    cropped_img = img.crop(box)
    
    cropped_img = cropped_img.resize((width, height), Image.Resampling.LANCZOS)
    cropped_img.save(img_path)

try:
    crop_center("assets/icon.png")
    crop_center("assets/splash.png")
    print("Cropped successfully")
except Exception as e:
    print(f"Error: {e}")
