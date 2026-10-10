with open("README.md", "r") as f:
    content = f.read()

content = content.replace("pip install -r requirements.txt", "uv pip install -r requirements.txt")
content = content.replace("npm install", "bun install")
content = content.replace("npm run dev", "bun run dev")

with open("README.md", "w") as f:
    f.write(content)
