import codecs
import sys

try:
    # Try reading as UTF-16 first (PowerShell default)
    with codecs.open('design_output.md', 'r', 'utf-16') as f:
        content = f.read()
except UnicodeError:
    # Fallback if it wasn't UTF-16
    with open('design_output.md', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    sys.exit(1)

with open('design_output_utf8.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("Conversion complete.")
