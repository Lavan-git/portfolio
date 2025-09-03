const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Add auto-reload script for HTML files
            if (extname === '.html') {
                const autoReloadScript = `
                <script>
                // Auto-reload functionality
                let lastModified = '';
                const checkForUpdates = () => {
                    fetch('/check-update')
                        .then(response => response.text())
                        .then(data => {
                            if (lastModified && lastModified !== data) {
                                console.log('Files updated, reloading...');
                                window.location.reload();
                            }
                            lastModified = data;
                        })
                        .catch(error => console.log('Auto-reload check failed:', error));
                };
                
                // Check for updates every 1 second
                setInterval(checkForUpdates, 1000);
                checkForUpdates();
                </script>
                `;
                
                content = content.toString().replace('</body>', autoReloadScript + '</body>');
            }
            
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

// Create HTTP server with proper routing
const handleRequest = (req, res) => {
    // Handle update check endpoint
    if (req.url === '/check-update') {
        const filesToWatch = ['index.html', 'terminal.js', 'terminal.css'];
        let latestTime = 0;
        
        filesToWatch.forEach(file => {
            try {
                const stats = fs.statSync(file);
                if (stats.mtime.getTime() > latestTime) {
                    latestTime = stats.mtime.getTime();
                }
            } catch (error) {
                // File doesn't exist, ignore
            }
        });
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(latestTime.toString());
        return;
    }
    
    // Handle file requests
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Add auto-reload script for HTML files
            if (extname === '.html') {
                const autoReloadScript = `
                <script>
                let lastModified = '';
                const checkForUpdates = () => {
                    fetch('/check-update')
                        .then(response => response.text())
                        .then(data => {
                            if (lastModified && lastModified !== data) {
                                console.log('Files updated, reloading...');
                                window.location.reload();
                            }
                            lastModified = data;
                        })
                        .catch(() => {});
                };
                setInterval(checkForUpdates, 1000);
                checkForUpdates();
                </script>
                `;
                
                content = content.toString().replace('</body>', autoReloadScript + '</body>');
            }
            
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
};

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Development server running at http://localhost:${PORT}`);
    console.log('📁 Serving files from current directory');
    console.log('🔄 Auto-reload enabled - changes will refresh the browser automatically');
    console.log('⚡ Watching: index.html, terminal.js, terminal.css');
    console.log('\n💡 Press Ctrl+C to stop the server\n');
    
    // Auto-open browser
    const start = process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});
