class LavanAITerminal {
    constructor() {
        this.input = document.getElementById('command-input');
        this.content = document.getElementById('content');
        this.helpPanel = document.getElementById('help-panel');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.setupEventListeners();
        this.hideBootSequence();
        
        // Portfolio data structured from resume
        this.portfolioData = {
            profile: {
                name: "Lavan Gupta",
                location: "Vellore, India",
                email: "lavangupta2005@gmail.com",
                phone: "+91 7042143211",
                linkedin: "https://linkedin.com/in/lavan-gupta-bb6850259",
                github: "https://github.com/Lavan-git",
                summaries: {
                    default: "Final year CSE student with Data Science specialization and proven track record in ML, web development, and data analysis. Successfully delivered projects with 95%+ accuracy in healthcare AI and optimized systems achieving 60% performance improvements. Strong academic foundation (8.82 CGPA) combined with practical industry experience through multiple internships.",
                    "ml-engineer": "Aspiring ML Engineer with hands-on experience building production-ready AI systems. Developed CNN-based medical diagnosis tool achieving 95%+ accuracy on 5K+ chest X-rays, and optimized chatbot retrieval systems reducing query time by 60%. Proficient in PyTorch, TensorFlow, computer vision, and NLP. Ready to contribute to innovative ML solutions and scale AI applications.",
                    "data-scientist": "Data Science specialist with proven ability to extract actionable insights from complex datasets. Successfully analyzed defense documentation, healthcare data, and business records to drive decision-making. Skilled in statistical modeling, hypothesis testing, and data visualization using Python/R. Demonstrated impact through measurable improvements in system efficiency and data processing workflows.",
                    "web-developer": "Full-stack developer with experience building scalable web applications and optimizing backend performance. Created complete booking platforms with authentication, API integration, and database optimization achieving 20-25% response time improvements. Proficient in Node.js, Express, React, MongoDB, and modern web technologies. Passionate about creating efficient, user-centric solutions.",
                    "software-engineer": "Software engineering student with proven ability to build scalable, production-ready applications. Developed full-stack systems including healthcare AI platforms and booking management tools, implementing secure JWT authentication and optimizing performance by 20-60%. Proficient in multiple languages (Python, Java, JavaScript) and experienced with both frontend and backend development. Strong foundation in algorithms, data structures, and system design principles.",
                    "data-analyst": "Data analyst with experience processing and analyzing large datasets to identify trends and optimization opportunities. Successfully reduced manual reporting effort by 15% and improved data processing workflows. Skilled in Excel, CSV processing, statistical analysis, and creating structured reports for stakeholders. Strong attention to detail and analytical thinking.",
                    "intern": "High-performing computer science student seeking challenging internship opportunities. Smart India Hackathon finalist (top 0.5%), with hands-on experience in ML projects, web development, and data analysis. Demonstrated leadership as Vice Chairperson organizing 100+ participant events. Ready to contribute technical skills and fresh perspective to innovative projects."
                }
            },
            education: {
                university: "Vellore Institute of Technology (VIT), Vellore",
                degree: "B.Tech. in Computer Science and Engineering (Data Science)",
                cgpa: "8.82",
                duration: "09/2022 – Present",
                school: "Modern Delhi Public School, Faridabad",
                class12: "88%",
                class10: "93%"
            },
            experience: [
                {
                    title: "ML Intern",
                    company: "AVNL (Armoured Vehicles Nigam Limited)",
                    duration: "05/2025 – 07/2025",
                    details: [
                        "Designed and tested chatbot retrieval pipelines on 1K+ queries to improve accuracy",
                        "Analyzed defense documentation to optimize knowledge base design, cutting query time by ~60%",
                        "Summarized test findings and provided structured recommendations for offline deployment workflows"
                    ]
                },
                {
                    title: "Web Developer Intern",
                    company: "VoxVertex Solutions",
                    duration: "10/2024 – 02/2025",
                    details: [
                        "Built and tested REST APIs using Node.js and Express, ensuring reliable data flow",
                        "Conducted backend performance analysis, applying indexing and query optimization to improve API response by ~25%",
                        "Implemented JWT multi-token authentication with IP restrictions, strengthening user access security"
                    ]
                },
                {
                    title: "Developer Intern",
                    company: "DRA Consultants",
                    duration: "06/2024 – 08/2024",
                    details: [
                        "Designed 5+ digital forms to capture excavation, material usage, and testing data across project sites",
                        "Compiled and analyzed 50+ records to identify delays and compliance issues",
                        "Processed daily entries into structured datasets (Excel/CSV), reducing manual reporting effort by ~15%"
                    ]
                }
            ],
            projects: [
                {
                    name: "Doctor Vision – Deep Learning Diagnosis Tool",
                    link: "https://doctor-vision-2idb.onrender.com/",
                    duration: "10/2024 – 03/2025",
                    tech: "CNN, VGG16, ResNet50v2, Python, Healthcare AI",
                    details: [
                        "Developed and validated CNN-based diagnostic models on 5K+ chest X-rays, achieving >95% pneumonia detection accuracy",
                        "Applied histogram equalization for preprocessing and integrated chatbot UI for interactive diagnosis support",
                        "Collected and analyzed real-world validation data from partnered hospitals to assess model reliability"
                    ]
                },
                {
                    name: "Urbannest – Hotel Booking Platform",
                    link: "https://urbannest-21n7.onrender.com/",
                    duration: "10/2024 – 12/2024",
                    tech: "Node.js, Express, MongoDB, EJS, Mapbox API, JWT",
                    details: [
                        "Built a full-stack hotel booking platform with complete booking management features",
                        "Integrated Mapbox API for location-based search and JWT authentication for secure logins",
                        "Optimized backend queries and indexing, improving API response time by ~20%"
                    ]
                }
            ],
            skills: {
                analytical: ["Data Analysis", "Hypothesis Testing", "Statistical Modeling", "Reporting"],
                programming: ["Python", "Java", "C/C++", "JavaScript", "R"],
                frameworks: ["Flask", "FastAPI", "Node.js", "Express.js", "React.js"],
                databases: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
                aiml: ["PyTorch", "TensorFlow", "Transfer Learning", "Computer Vision", "FAISS", "LangChain", "Whisper"],
                tools: ["Git", "IIS Deployment", "Mapbox", "Gradio", "FFmpeg", "Nodemailer"]
            },
            achievements: [
                "Smart India Hackathon 2024 Finalist – Built ML-powered gray water reuse + predictive maintenance solution; shortlisted in top 0.5%"
            ],
            leadership: {
                title: "Vice Chairperson – ISA-VIT Chapter",
                duration: "01/2024 – 12/2024",
                details: [
                    "Organized 'Binary Battles' hackathon with 100+ participants, coordinating logistics and ensuring smooth execution",
                    "Coordinated an 'AI in Cybersecurity' lecture by Prayukth KV, exposing members to industry applications of AI",
                    "Conducted multiple technical workshops in AI and automation, expanding chapter outreach and participation"
                ]
            }
        };
    }

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });

        // Close help panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.helpPanel.contains(e.target) && this.helpPanel.style.display === 'block') {
                this.helpPanel.style.display = 'none';
            }
        });
    }

    hideBootSequence() {
        setTimeout(() => {
            const bootSequence = document.querySelector('.boot-sequence');
            bootSequence.style.display = 'none';
        }, 3000);
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }

    executeCommand(command) {
        if (command === '') return;
        
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        this.addOutput(`lavan@ai-portfolio:~$ ${command}`, 'command');
        
        // Parse command
        const parts = command.split(' ');
        const mainCommand = parts[0];
        const args = parts.slice(1);
        
        switch (mainCommand.toLowerCase()) {
            case 'help':
                this.showHelp();
                break;
            case 'whoami':
                this.showProfile();
                break;
            case 'profile':
                this.handleProfileCommand(args);
                break;
            case 'roles':
                this.showAvailableRoles();
                break;
            case 'ls':
                this.listCommand(args);
                break;
            case 'cat':
                this.catCommand(args);
                break;
            case 'grep':
                this.grepCommand(args);
                break;
            case './query':
                this.queryCommand(args);
                break;
            case './analyze':
                this.analyzeCommand(args);
                break;
            case './connect':
                this.connectCommand(args);
                break;
            case 'sudo':
                this.sudoCommand(args);
                break;
            case './neural-scan':
                this.neuralScan();
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case 'exit':
                this.exitTerminal();
                break;
            default:
                this.addOutput(`Command '${command}' not found. Type 'help' or 'roles' for available commands.`, 'error');
        }
        
        this.scrollToBottom();
    }

    addOutput(text, type = 'result') {
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        line.textContent = text;
        
        // Insert before command line
        const commandLine = document.querySelector('.command-line');
        commandLine.parentNode.insertBefore(line, commandLine);
    }

    addHTMLOutput(html, type = 'result') {
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        line.innerHTML = html;
        
        const commandLine = document.querySelector('.command-line');
        commandLine.parentNode.insertBefore(line, commandLine);
    }

    showHelp() {
        this.addOutput('Available commands are shown in the right panel. Use sidebar or type commands directly.', 'success');
    }

    showProfile(role = 'default') {
        const profile = this.portfolioData.profile;
        const summary = profile.summaries[role] || profile.summaries.default;
        
        const profileHTML = `
╔════════════════════════════════════════════════════════════════╗
║                         PROFILE DATA                           ║
╠════════════════════════════════════════════════════════════════╣
║ Name:        Lavan Gupta                                       ║
║ Location:    Vellore, India                                    ║
║ Email:       <a href="mailto:${profile.email}" style="color: #4ecdc4; text-decoration: underline;">${profile.email}</a>                        ║
║ Phone:       <a href="tel:${profile.phone}" style="color: #4ecdc4; text-decoration: underline;">${profile.phone}</a>                                  ║
║ LinkedIn:    <a href="${profile.linkedin}" target="_blank" style="color: #4ecdc4; text-decoration: underline;">linkedin.com/in/lavan-gupta-bb6850259</a>           ║
║ GitHub:      <a href="${profile.github}" target="_blank" style="color: #4ecdc4; text-decoration: underline;">github.com/Lavan-git</a>                            ║
╚════════════════════════════════════════════════════════════════╝`;
        
        this.addHTMLOutput(profileHTML, 'result');
        
        // Add spacing and then summary
        this.addOutput('', 'result');
        this.addOutput(`${role !== 'default' ? 'ROLE-TAILORED ' : ''}SUMMARY:`, 'system-output');
        this.addOutput('', 'result');
        
        // Split summary into paragraphs for better readability
        const words = summary.split(' ');
        let currentLine = '';
        const maxLineLength = 80;
        
        words.forEach(word => {
            if (currentLine.length + word.length + 1 <= maxLineLength) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                this.addOutput(currentLine, 'result');
                currentLine = word;
            }
        });
        
        if (currentLine) {
            this.addOutput(currentLine, 'result');
        }
        
        if (role !== 'default') {
            this.addOutput('', 'result');
            this.addOutput(`💡 Profile optimized for: ${role.replace('-', ' ').toUpperCase()}`, 'success');
        }
    }


    listCommand(args) {
        if (args.length === 0) {
            this.addOutput('Available directories: experience, projects, skills, education, achievements', 'result');
            return;
        }
        
        const target = args[0];
        switch (target) {
            case 'experience':
                this.addOutput('═══ WORK EXPERIENCE ═══', 'info');
                this.portfolioData.experience.forEach((exp, index) => {
                    this.addOutput(`${index + 1}. ${exp.title} @ ${exp.company} (${exp.duration})`, 'result');
                });
                break;
            case 'projects':
                this.addOutput('═══ PROJECTS ═══', 'info');
                this.portfolioData.projects.forEach((proj, index) => {
                    this.addOutput(`${index + 1}. ${proj.name} - ${proj.tech}`, 'result');
                });
                break;
            case 'skills':
                this.addOutput('═══ SKILL CATEGORIES ═══', 'info');
                Object.keys(this.portfolioData.skills).forEach(category => {
                    this.addOutput(`• ${category.toUpperCase()}`, 'result');
                });
                break;
            default:
                this.addOutput(`Directory '${target}' not found.`, 'error');
        }
    }

    catCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cat <target>', 'error');
            return;
        }
        
        const target = args[0];
        switch (target) {
            case 'projects':
                this.showDetailedProjects();
                break;
            case 'experience':
                this.showDetailedExperience();
                break;
            case 'skills':
                this.showDetailedSkills();
                break;
            default:
                this.addOutput(`File '${target}' not found.`, 'error');
        }
    }

    showDetailedProjects() {
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        this.addOutput('                           PROJECTS                            ', 'info');
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        
        this.portfolioData.projects.forEach((project, index) => {
            this.addOutput(`\n[${index + 1}] ${project.name}`, 'success');
            this.addOutput(`    Duration: ${project.duration}`, 'result');
            this.addOutput(`    Tech Stack: ${project.tech}`, 'result');
            this.addOutput(`    Live Demo: ${project.link}`, 'result');
            this.addOutput(`    Details:`, 'result');
            project.details.forEach(detail => {
                this.addOutput(`      • ${detail}`, 'result');
            });
            this.addOutput('', 'result');
        });
    }

    showDetailedExperience() {
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        this.addOutput('                       WORK EXPERIENCE                        ', 'info');
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        
        this.portfolioData.experience.forEach((exp, index) => {
            this.addOutput(`\n[${index + 1}] ${exp.title}`, 'success');
            this.addOutput(`    Company: ${exp.company}`, 'result');
            this.addOutput(`    Duration: ${exp.duration}`, 'result');
            this.addOutput(`    Key Achievements:`, 'result');
            exp.details.forEach(detail => {
                this.addOutput(`      • ${detail}`, 'result');
            });
            this.addOutput('', 'result');
        });
    }

    showDetailedSkills() {
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        this.addOutput('                          SKILLS MATRIX                       ', 'info');
        this.addOutput('═══════════════════════════════════════════════════════════════', 'info');
        
        Object.entries(this.portfolioData.skills).forEach(([category, skills]) => {
            this.addOutput(`\n${category.toUpperCase()}:`, 'success');
            const skillsText = skills.join(' • ');
            this.addOutput(`  ${skillsText}`, 'result');
        });
    }

    grepCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: grep <search_term>', 'error');
            return;
        }
        
        const searchTerm = args[0].toLowerCase();
        this.addOutput(`Searching for '${searchTerm}' in portfolio data...`, 'info');
        
        let results = [];
        
        // Search in skills
        Object.entries(this.portfolioData.skills).forEach(([category, skills]) => {
            skills.forEach(skill => {
                if (skill.toLowerCase().includes(searchTerm)) {
                    results.push(`SKILL: ${skill} (${category})`);
                }
            });
        });
        
        // Search in projects
        this.portfolioData.projects.forEach(project => {
            if (project.name.toLowerCase().includes(searchTerm) || 
                project.tech.toLowerCase().includes(searchTerm)) {
                results.push(`PROJECT: ${project.name}`);
            }
        });
        
        // Search in experience
        this.portfolioData.experience.forEach(exp => {
            if (exp.title.toLowerCase().includes(searchTerm) || 
                exp.company.toLowerCase().includes(searchTerm)) {
                results.push(`EXPERIENCE: ${exp.title} @ ${exp.company}`);
            }
        });
        
        if (results.length > 0) {
            this.addOutput(`Found ${results.length} matches:`, 'success');
            results.forEach(result => {
                this.addOutput(`  • ${result}`, 'result');
            });
        } else {
            this.addOutput(`No matches found for '${searchTerm}'`, 'error');
        }
    }

    queryCommand(args) {
        if (args.length === 0 || !args[0].startsWith('--')) {
            this.addOutput('Usage: ./query --<option>', 'error');
            this.addOutput('Available options: --education, --contact, --summary', 'info');
            return;
        }
        
        const option = args[0].substring(2);
        switch (option) {
            case 'education':
                this.showEducation();
                break;
            case 'contact':
                this.showContact();
                break;
            case 'summary':
                this.addOutput(this.portfolioData.profile.summary, 'result');
                break;
            default:
                this.addOutput(`Unknown option: ${option}`, 'error');
        }
    }

    showEducation() {
        const edu = this.portfolioData.education;
        const output = `
╔════════════════════════════════════════════════════════════════════╗
║                         EDUCATION DATA                             ║
╠════════════════════════════════════════════════════════════════════╣
║ University: ${edu.university.padEnd(49)} ║
║ Degree:     ${edu.degree.padEnd(49)} ║
║ CGPA:       ${edu.cgpa.padEnd(49)} ║
║ Duration:   ${edu.duration.padEnd(49)} ║
║                                                                ║
║ School:     ${edu.school.padEnd(49)} ║
║ Class 12:   ${edu.class12.padEnd(49)} ║
║ Class 10:   ${edu.class10.padEnd(49)} ║
╚════════════════════════════════════════════════════════════════════╝`;
        this.addOutput(output, 'result');
    }

    showContact() {
        const profile = this.portfolioData.profile;
        const output = `
╔════════════════════════════════════════════════════════════════════╗
║                        CONTACT MATRIX                        ║
╠════════════════════════════════════════════════════════════════════╣
║ 📧 Email:    ${profile.email.padEnd(47)} ║
║ 📞 Phone:    ${profile.phone.padEnd(47)} ║
║ 📍 Location: ${profile.location.padEnd(47)} ║
║ 💼 LinkedIn: ${profile.linkedin.slice(0,47).padEnd(47)} ║
║ 🔗 GitHub:   ${profile.github.slice(0,47).padEnd(47)} ║
╚════════════════════════════════════════════════════════════════════╝`;
        this.addOutput(output, 'result');
    }

    analyzeCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: ./analyze <target>', 'error');
            return;
        }
        
        const target = args[0];
        switch (target) {
            case 'achievements':
                this.showAchievements();
                break;
            case 'leadership':
                this.showLeadership();
                break;
            default:
                this.addOutput(`Analysis target '${target}' not found.`, 'error');
        }
    }

    showAchievements() {
        this.addOutput('═══════════════════════════════════════════════════════════════', 'success');
        this.addOutput('                        ACHIEVEMENTS                           ', 'success');
        this.addOutput('═══════════════════════════════════════════════════════════════', 'success');
        this.portfolioData.achievements.forEach(achievement => {
            this.addOutput(`🏆 ${achievement}`, 'result');
        });
    }

    showLeadership() {
        const leadership = this.portfolioData.leadership;
        this.addOutput('═══════════════════════════════════════════════════════════════', 'success');
        this.addOutput('                         LEADERSHIP                           ', 'success');
        this.addOutput('═══════════════════════════════════════════════════════════════', 'success');
        this.addOutput(`Position: ${leadership.title}`, 'result');
        this.addOutput(`Duration: ${leadership.duration}`, 'result');
        this.addOutput('Key Contributions:', 'result');
        leadership.details.forEach(detail => {
            this.addOutput(`  • ${detail}`, 'result');
        });
    }

    connectCommand(args) {
        if (args.length === 0 || args[0] !== '--social') {
            this.addOutput('Usage: ./connect --social', 'error');
            return;
        }
        
        const profile = this.portfolioData.profile;
        this.addOutput('Establishing social connections...', 'info');
        setTimeout(() => {
            this.addOutput('🌐 Social Networks Available:', 'success');
            this.addOutput(`📧 Email: ${profile.email}`, 'result');
            this.addOutput(`💼 LinkedIn: ${profile.linkedin}`, 'result');
            this.addOutput(`🔗 GitHub: ${profile.github}`, 'result');
            this.addOutput(`📞 Phone: ${profile.phone}`, 'result');
        }, 1000);
    }

    sudoCommand(args) {
        if (args.length < 2 || args[0] !== 'access' || args[1] !== '--resume') {
            this.addOutput('Usage: sudo access --resume', 'error');
            return;
        }
        
        this.addOutput('Accessing secure resume files...', 'info');
        setTimeout(() => {
            this.addOutput('✓ Authentication successful', 'success');
            this.addOutput('📄 Resume download would be triggered here', 'result');
            this.addOutput('📍 Full resume available at: lavangupta2005@gmail.com', 'result');
        }, 1500);
    }

    neuralScan() {
        this.addOutput('Running portfolio analysis...', 'info');
        this.addOutput('', 'result');
        
        setTimeout(() => {
            this.addOutput('📊 STUDENT PORTFOLIO ANALYSIS', 'neural-output');
            this.addOutput('', 'result');
            this.addOutput('┌─ Academic Performance: Strong (CGPA 8.82)', 'data-output');
            this.addOutput('├─ Project Experience: Impressive (Healthcare AI, Web Apps)', 'data-output');
            this.addOutput('├─ Technical Skills: Solid Foundation (ML, Full-Stack)', 'data-output');
            this.addOutput('├─ Industry Exposure: Good (3 Internships)', 'data-output');
            this.addOutput('├─ Leadership: Demonstrated (VP, Hackathon Organizer)', 'data-output');
            this.addOutput('└─ Graduation Readiness: High', 'data-output');
            this.addOutput('', 'result');
            this.addOutput('🎯 CAREER RECOMMENDATIONS:', 'system-output');
            this.addOutput('  • Target: ML Engineer or Data Scientist roles', 'result');
            this.addOutput('  • Focus: Build 1-2 more advanced projects', 'result');
            this.addOutput('  • Strength: Healthcare AI and Web Development', 'result');
        }, 2000);
    }

    clearTerminal() {
        const outputs = document.querySelectorAll('.output-line');
        outputs.forEach(output => output.remove());
        this.addOutput('Terminal cleared.', 'success');
    }

    exitTerminal() {
        this.addOutput('Shutting down Lavan AI Portfolio System...', 'info');
        setTimeout(() => {
            this.addOutput('Thank you for exploring my portfolio! 🚀', 'success');
            setTimeout(() => {
                window.close();
            }, 2000);
        }, 1000);
    }

    handleProfileCommand(args) {
        if (args.length === 0) {
            this.addOutput('Usage: profile <role>', 'error');
            this.addOutput('Available roles: ml-engineer, data-scientist, web-developer, software-engineer, research-analyst, intern', 'info');
            this.addOutput('Example: profile ml-engineer', 'info');
            return;
        }
        
        const role = args[0].toLowerCase();
        const availableRoles = Object.keys(this.portfolioData.profile.summaries);
        
        if (!availableRoles.includes(role)) {
            this.addOutput(`Invalid role: ${role}`, 'error');
            this.addOutput(`Available roles: ${availableRoles.filter(r => r !== 'default').join(', ')}`, 'info');
            return;
        }
        
        this.showProfile(role);
    }
    
    showAvailableRoles() {
        this.addOutput('🎯 AVAILABLE ROLE-BASED PROFILES', 'success');
        this.addOutput('════════════════════════════════════════════════════════════════', 'success');
        
        const roles = Object.keys(this.portfolioData.profile.summaries).filter(role => role !== 'default');
        
        roles.forEach((role, index) => {
            const roleDisplayName = role.replace('-', ' ').toUpperCase();
            this.addOutput(`${index + 1}. ${roleDisplayName}`, 'result');
            this.addOutput(`   Command: profile ${role}`, 'info');
            
            // Show first 100 characters of summary as preview
            const preview = this.portfolioData.profile.summaries[role].substring(0, 100) + '...';
            this.addOutput(`   Preview: ${preview}`, 'result');
            this.addOutput('', 'result');
        });
        
        this.addOutput('💡 Usage: Type "profile <role>" to see customized summary', 'success');
        this.addOutput('📋 Example: "profile ml-engineer" for ML Engineer profile', 'success');
    }

    scrollToBottom() {
        this.content.scrollTop = this.content.scrollHeight;
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terminalInstance = new LavanAITerminal();
    
    // Setup sidebar toggle
    const toggleBtn = document.getElementById('toggle-help');
    const sidebar = document.getElementById('help-sidebar');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '→' : '←';
    });
    
    // Add event listener to collapsed sidebar indicator
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('collapsed') && 
            e.target.closest('.help-sidebar.collapsed::after, .help-sidebar.collapsed')) {
            sidebar.classList.remove('collapsed');
            toggleBtn.textContent = '←';
        }
    });
    
    // Make collapsed sidebar clickable
    sidebar.addEventListener('click', (e) => {
        if (sidebar.classList.contains('collapsed') && e.target === sidebar) {
            sidebar.classList.remove('collapsed');
            toggleBtn.textContent = '←';
        }
    });
});

// Global function for sidebar command execution
function executeFromSidebar(command) {
    const input = document.getElementById('command-input');
    input.value = command;
    window.terminalInstance.executeCommand(command);
    input.value = '';
    input.focus();
}
