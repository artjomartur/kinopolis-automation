from PIL import Image, ImageDraw, ImageFont
import os

size = 512
img = Image.new('RGBA', (size, size), color=(0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw a red rounded rectangle (or just a circle/square, but rounded looks nice like an app icon)
radius = 120
rect = [0, 0, size, size]
red = (229, 9, 20) # typical kinopolis / netflix red

# Draw rounded rectangle manually or just a circle
draw.rounded_rectangle(rect, radius=radius, fill=red)

# Try to load a bold font
font = None
font_paths = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNS.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Impact.ttf"
]
for path in font_paths:
    if os.path.exists(path):
        try:
            font = ImageFont.truetype(path, 350)
            break
        except:
            pass

if not font:
    font = ImageFont.load_default()

text = "K"

# Get text bounding box to center it
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

# Note: bounding box offset might need adjustment
x = (size - text_width) / 2 - bbox[0]
y = (size - text_height) / 2 - bbox[1]

# Slight visual adjustment for typical "K" characters to look perfectly centered
y -= 20

draw.text((x, y), text, font=font, fill=(255, 255, 255))

img.save("new_logo.png")
print("Saved new_logo.png")
