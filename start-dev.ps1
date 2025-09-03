# Lavan's AI Portfolio Development Server Starter
# This script starts the development server with auto-reload functionality

Write-Host "🤖 Lavan's AI Portfolio Development Server" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if Node.js is available
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host "❌ Node.js not found. Using Python instead..." -ForegroundColor Yellow
    
    # Fallback to Python's built-in server
    try {
        $pythonVersion = python --version 2>$null
        if ($pythonVersion) {
            Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
            Write-Host "🚀 Starting Python development server..." -ForegroundColor Cyan
            Write-Host "📍 Server will be available at: http://localhost:8000" -ForegroundColor Green
            Write-Host "💡 Note: Auto-reload not available with Python server" -ForegroundColor Yellow
            Write-Host "🔄 Refresh browser manually after code changes" -ForegroundColor Yellow
            Write-Host ""
            
            # Start Python server and open browser
            Start-Process "http://localhost:8000"
            python -m http.server 8000
            exit
        }
    } catch {
        Write-Host "❌ Neither Node.js nor Python found!" -ForegroundColor Red
        Write-Host "Please install Node.js or Python to run the development server." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Start Node.js development server
Write-Host "🚀 Starting Node.js development server with auto-reload..." -ForegroundColor Cyan
Write-Host "📍 Server will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "🔄 Auto-reload enabled - changes will refresh browser automatically" -ForegroundColor Green
Write-Host "⚡ Watching: index.html, terminal.js, terminal.css" -ForegroundColor Green
Write-Host ""
Write-Host "💡 To stop server: Press Ctrl+C" -ForegroundColor Yellow
Write-Host "🌐 Browser will open automatically..." -ForegroundColor Magenta
Write-Host ""

# Start the Node.js development server
node dev-server.js
