with open("Dockerfile.frontend", "r") as f:
    content = f.read()

content = content.replace("FROM node:alpine AS builder", "FROM oven/bun:alpine AS builder")
content = content.replace("RUN npm ci", "RUN bun install")
content = content.replace("RUN npm run build", "RUN bun run build")

with open("Dockerfile.frontend", "w") as f:
    f.write(content)
