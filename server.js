const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;

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

const server = http.createServer((req, res) => {
    // Handle auto-reload check
    if (req.url === '/check-update') {
        const files = ['index.html', 'terminal.js', 'terminal.css'];
        let latestTime = 0;
        
        files.forEach(file => {
            try {
                const stats = fs.statSync(file);
                latestTime = Math.max(latestTime, stats.mtime.getTime());
            } catch (e) {}
        });
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(latestTime.toString());
        return;
    }

    // Serve files
    let filePath = req.url === '/' ? './index.html' : '.' + req.url;
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(err.code === 'ENOENT' ? 404 : 500);
            res.end(err.code === 'ENOENT' ? 'File not found' : 'Server error');
            return;
        }

        // Add auto-reload to HTML
        if (ext === '.html') {
            const script = `
<script>
let lastMod = '';
setInterval(() => {
    fetch('/check-update')
        .then(r => r.text())
        .then(data => {
            if (lastMod && lastMod !== data) location.reload();
            lastMod = data;
        })
        .catch(() => {});
}, 1000);
</script>`;
            content = content.toString().replace('</body>', script + '</body>');
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('🔄 Auto-reload enabled');
    console.log('💡 Press Ctrl+C to stop\n');
    
    // Open browser
    exec(`start http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped');
    process.exit(0);
});
