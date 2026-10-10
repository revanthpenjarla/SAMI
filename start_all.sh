#!/bin/bash

# Exit immediately if a command fails
set -e

# Setup a trap to kill all background processes when this script exits
trap 'echo "Stopping all services..."; kill 0' SIGINT SIGTERM EXIT

echo "==================================="
echo "🚀 Starting Smart Contract Scanner!"
echo "==================================="

echo "[1/3] Starting Local AI (Ollama)..."
# Start Ollama server in the background
ollama serve > /dev/null 2>&1 &
# Give it a couple of seconds to boot up
sleep 3 
# Pull the model (this is safe to run repeatedly, it verifies if it exists)
ollama pull qwen2.5-coder:latest

echo ""
echo "[2/3] Starting FastAPI Backend..."
cd backend
uv pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000 &
cd ..

echo ""
echo "[3/3] Starting React Frontend..."
cd frontend
bun install
bun run dev &
cd ..

echo ""
echo "==================================="
echo "✅ All systems go!"
echo "📡 Backend API: http://localhost:8000"
echo "🖥️  Frontend UI: http://localhost:5173"
echo "🧠 Ollama AI: http://localhost:11434"
echo "==================================="
echo "Press Ctrl+C at any time to shut down all services."

# Wait indefinitely so the script doesn't exit and kill the trap
wait
