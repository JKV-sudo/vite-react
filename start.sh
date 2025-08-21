#!/bin/bash
echo "🚀 Starting Split-Vision Server..."
echo "Opening: http://localhost:8080"
echo "Press Ctrl+C to stop server"
echo ""

# Start server and open browser
python3 -m http.server 8080 &
SERVER_PID=$!

# Wait a moment then open browser
sleep 2
open http://localhost:8080

# Wait for user input to stop
echo "Server running! Press Enter to stop..."
read
kill $SERVER_PID
echo "Server stopped."
