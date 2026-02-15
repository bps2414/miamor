import os
from PIL import Image

# Configuration
ASSETS_DIR = 'dist/assets'
MAX_WIDTH = 1920
QUALITY = 85

def optimize_images():
    if not os.path.exists(ASSETS_DIR):
        print(f"Directory {ASSETS_DIR} not found.")
        return

    for filename in os.listdir(ASSETS_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(ASSETS_DIR, filename)
            try:
                with Image.open(filepath) as img:
                    # Resize if too large
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized {filename}")

                    # Save with optimization
                    # Preserve format but optimize
                    img.save(filepath, optimize=True, quality=QUALITY)
                    print(f"Optimized {filename}")
            except Exception as e:
                print(f"Failed to process {filename}: {e}")

if __name__ == '__main__':
    optimize_images()
