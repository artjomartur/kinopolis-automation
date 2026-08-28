from PIL import Image

def remove_white_bg(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    for item in data:
        # Check if pixel is white (or very close to white)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg("/Users/artjombecker/.gemini/antigravity-ide/brain/550a5141-973b-4343-b17a-b42a4df8f500/oli_funk_1787918901175.jpg", "KinopolisNative/KinopolisNative/Assets.xcassets/Oli_Funk.imageset/Oli_Funk.png")
