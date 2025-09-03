# Lavan Gupta - AI Terminal Portfolio

An interactive, terminal-style portfolio website showcasing my experience as a CSE undergraduate, Data Science specialist, ML Engineer, and Web Developer. This portfolio simulates an AI system interface with command-line interactions.

## 🚀 Live Demo

Experience the interactive terminal portfolio at: **https://portfolio-lilac-seven-96.vercel.app/**

## ✨ Features

- **Interactive Terminal Interface**: Command-line style interaction with portfolio data
- **AI-Themed Design**: Simulates an AI system with boot sequences and neural network references
- **Multiple Role Profiles**: Switch between ML Engineer, Software Engineer, and Web Developer profiles
- **Real-time Commands**: Execute various commands to explore experience, projects, skills, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-reload Development Server**: Hot reloading during development

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with terminal aesthetics
- **Typography**: JetBrains Mono font for authentic terminal feel
- **Development**: Node.js development server with auto-reload
- **Deployment**: GitHub Pages ready

## 🎯 Available Commands

The portfolio supports various terminal commands:

### Basic Information
- `whoami` - Default profile information
- `roles` - Available role profiles
- `profile <role>` - Switch to specific role (ml-engineer, software-engineer, web-developer)
- `./query --contact` - Contact details

### Experience & Projects
- `ls experience` - List work history
- `cat experience` - Detailed experience information
- `ls projects` - List all projects
- `cat projects` - Detailed project descriptions

### Skills & Education
- `cat skills` - Display all skills
- `./query --education` - Education information

### Advanced Features
- `./neural-scan` - AI analysis simulation
- `./analyze achievements` - Achievement analysis
- `./analyze leadership` - Leadership role analysis
- `grep <term>` - Search portfolio content
- `clear` - Clear terminal

## 🚦 Getting Started

### Prerequisites
- Node.js (recommended) or Python 3.x
- Modern web browser

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lavan-git/portfolio.git
   cd portfolio
   ```

2. **Start development server**:
   
   **Option 1: Using PowerShell (Windows)**
   ```powershell
   .\start-dev.ps1
   ```
   
   **Option 2: Using Node.js directly**
   ```bash
   node dev-server.js
   ```
   
   **Option 3: Using basic server**
   ```bash
   node server.js
   ```
   
   **Option 4: Python fallback**
   ```bash
   python -m http.server 8000
   ```

3. **Open browser**: Visit `http://localhost:8000`

### Development Features

- **Auto-reload**: Changes to `index.html`, `terminal.js`, and `terminal.css` automatically refresh the browser
- **Live development**: Instant feedback while coding
- **Cross-platform**: Works on Windows, macOS, and Linux

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file with terminal structure
├── terminal.js         # Interactive terminal functionality
├── terminal.css        # Terminal styling and animations
├── dev-server.js       # Development server with auto-reload
├── server.js           # Basic production server
├── start-dev.ps1       # PowerShell development starter script
└── README.md           # Project documentation
```

## 🎨 Customization

### Adding New Commands
Edit `terminal.js` and add your command to the command handling logic:

```javascript
if (command === 'your-command') {
    return 'Your response here';
}
```

### Styling Changes
Modify `terminal.css` to customize:
- Colors and themes
- Typography
- Animations
- Layout

### Content Updates
Update the portfolio data in `terminal.js` within the command responses.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel automatically builds and deploys on every push
3. Get instant previews for pull requests
4. Custom domain support available
5. **Currently deployed at**: https://portfolio-lilac-seven-96.vercel.app/

### GitHub Pages
1. Push your changes to the main branch
2. Enable GitHub Pages in repository settings
3. Select "Deploy from a branch" and choose "main"
4. Your portfolio will be live at `https://yourusername.github.io/portfolio`

### Other Platforms
The portfolio is a static website and can be deployed on:
- Netlify
- AWS S3
- Any static hosting service

## 👨‍💻 About

Created by **Lavan Gupta**
- 🎓 CSE Undergraduate at VIT
- 🤖 Data Science Specialist & ML Engineer
- 🌐 Full-Stack Web Developer
- 🏆 Smart India Hackathon Finalist
- 💼 Research Analyst with industry experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you have suggestions for improvements, please open an issue or submit a pull request.

---

**Experience the future of portfolio presentation with AI-powered terminal interactions!** 🚀
