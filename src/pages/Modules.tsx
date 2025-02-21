import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Globe, Network, FileCode, ChevronRight, CheckCircle, Terminal as TerminalIcon, Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import LetterGlitch from '../components/LetterGlitch';
import Terminal from '../components/Terminal';
import CodeEditor from '../components/CodeEditor';
import NetworkVisualizer from '../components/NetworkVisualizer';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: string;
  duration: string;
  tools: string[];
  content: {
    theory: string;
    practice: string;
    quiz: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

const modules: Module[] = [
  {
    id: 'crypto',
    title: "Cryptography Fundamentals",
    description: "Learn the basics of encryption, hashing, and secure communication protocols.",
    icon: Lock,
    difficulty: "Beginner",
    duration: "4 hours",
    tools: ["OpenSSL", "John the Ripper", "Hashcat", "GPG"],
    content: {
      theory: `# Introduction to Cryptography

Cryptography is the practice of securing communication from third-party observers. Let's explore the basic concepts:

## Symmetric Encryption
In symmetric encryption, the same key is used for both encryption and decryption.

\`\`\`javascript
const message = "Hello, World!";
const key = "secret-key";
const encrypted = CryptoJS.AES.encrypt(message, key);
const decrypted = CryptoJS.AES.decrypt(encrypted, key);
\`\`\`

## Tools Overview

### OpenSSL
- Generate certificates
- Encrypt/decrypt files
- Create and verify signatures

### John the Ripper
- Password cracking
- Hash identification
- Dictionary attacks

### Hashcat
- Advanced password recovery
- GPU acceleration
- Rule-based attacks

### GPG
- File encryption
- Digital signatures
- Key management`,
      practice: `
// Try encrypting this message using the Caesar cipher
const message = "HELLO";
const shift = 3;

function caesarCipher(text, shift) {
  // Your code here
}`,
      quiz: [
        {
          question: "What is the main difference between symmetric and asymmetric encryption?",
          options: [
            "Symmetric encryption is always faster",
            "Symmetric encryption uses the same key for encryption and decryption",
            "Asymmetric encryption is more secure",
            "There is no difference"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'network',
    title: "Network Security",
    description: "Master network penetration testing and security analysis",
    icon: Network,
    difficulty: "Intermediate",
    duration: "6 hours",
    tools: ["Wireshark", "Nmap", "Netcat", "TCPDump"],
    content: {
      theory: `# Network Security Fundamentals

## Essential Tools

### Wireshark
- Packet analysis
- Protocol inspection
- Network troubleshooting

### Nmap
- Port scanning
- Service detection
- OS fingerprinting

### Netcat
- Port listening
- Banner grabbing
- File transfer

### TCPDump
- Command-line packet analysis
- Traffic filtering
- Network debugging`,
      practice: `
// Create a simple port scanner
function scanPort(host, port) {
  return new Promise((resolve) => {
    const socket = new WebSocket(\`ws://\${host}:\${port}\`);
    socket.onopen = () => {
      socket.close();
      resolve(true);
    };
    socket.onerror = () => resolve(false);
  });
}`,
      quiz: [
        {
          question: "Which tool is best for detailed packet analysis?",
          options: ["Nmap", "Wireshark", "Netcat", "TCPDump"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'web',
    title: "Web Security",
    description: "Learn web application security and penetration testing",
    icon: Globe,
    difficulty: "Advanced",
    duration: "8 hours",
    tools: ["Burp Suite", "OWASP ZAP", "Nikto", "Dirb"],
    content: {
      theory: `# Web Security Fundamentals

## Essential Tools

### Burp Suite
- Web proxy
- Scanner
- Repeater
- Intruder

### OWASP ZAP
- Automated scanning
- Spider
- Active/Passive scanning
- API testing

### Nikto
- Web server scanning
- Vulnerability checks
- Configuration analysis

### Dirb
- Directory enumeration
- Brute forcing
- Content discovery`,
      practice: `
// XSS Prevention Example
function sanitizeInput(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}`,
      quiz: [
        {
          question: "What is the primary purpose of Burp Suite?",
          options: [
            "Network scanning",
            "Web application testing",
            "Password cracking",
            "Malware analysis"
          ],
          correctAnswer: 1
        }
      ]
    }
  }
];

const Modules = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'terminal' | 'quiz'>('theory');
  const [code, setCode] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const handleCommand = (command: string) => {
    // Handle terminal commands
    console.log('Command executed:', command);
  };

  // Sample network data
  const networkData = [
    { source: '192.168.1.1', destination: '10.0.0.1', protocol: 'TCP', size: 64, timestamp: Date.now() },
    // Add more sample data...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <LetterGlitch
          text="Security Learning Hub"
          glitchSpeed={50}
          centerVignette={true}
          smooth={true}
        />
        <p className="text-gray-400 mt-4 mb-12 max-w-2xl mx-auto">
          Master cybersecurity with our comprehensive learning modules. Each module includes theory,
          hands-on practice, and essential security tools used by professionals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-[#12122a] to-[#1a1a2e] rounded-lg border cursor-pointer transition-all transform hover:scale-102 hover:shadow-xl ${
                  selectedModule?.id === module.id ? 'border-purple-500 shadow-purple-500/20' : 'border-purple-900 hover:border-purple-700'
                }`}
                onClick={() => setSelectedModule(module)}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-purple-900/30 rounded-lg">
                      <module.icon className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.tools.map((tool, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-900/30 rounded-md text-xs text-purple-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-400">
                          Difficulty: {module.difficulty}
                        </span>
                        <span className="text-purple-400">
                          Duration: {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedModule ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#12122a] to-[#1a1a2e] rounded-lg border border-purple-900 overflow-hidden shadow-xl"
            >
              <div className="border-b border-purple-900/50">
                <div className="flex space-x-1 p-4">
                  {(['theory', 'practice', 'terminal', 'quiz'] as const).map((tab) => (
                    <button
                      key={tab}
                      className={`px-6 py-3 rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'text-gray-400 hover:bg-purple-900/50'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'theory' && (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                      {selectedModule.content.theory}
                    </ReactMarkdown>
                    <NetworkVisualizer data={networkData} />
                  </div>
                )}

                {activeTab === 'practice' && (
                  <div className="space-y-6">
                    <CodeEditor
                      value={selectedModule.content.practice}
                      language="javascript"
                      onChange={setCode}
                    />
                    <div className="flex space-x-4">
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
                        Run Code
                      </button>
                      <button className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors">
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'terminal' && (
                  <Terminal
                    initialCommands={['echo "Welcome to the Security Terminal"']}
                    onCommand={handleCommand}
                  />
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-8">
                    {selectedModule.content.quiz.map((question, qIndex) => (
                      <motion.div
                        key={qIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: qIndex * 0.1 }}
                        className="bg-[#1a1a2e] rounded-lg p-6 shadow-xl"
                      >
                        <h3 className="text-xl font-bold mb-6">{question.question}</h3>
                        <div className="space-y-4">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-4 rounded-lg border cursor-pointer transition-all transform hover:scale-102 ${
                                quizAnswers[`${selectedModule.id}-${qIndex}`] === oIndex
                                  ? 'border-purple-500 bg-purple-900/50 shadow-purple-500/20'
                                  : 'border-purple-900 hover:border-purple-700'
                              }`}
                              onClick={() => setQuizAnswers(prev => ({
                                ...prev,
                                [`${selectedModule.id}-${qIndex}`]: oIndex
                              }))}
                            >
                              <div className="flex items-center">
                                <div className="flex-1">{option}</div>
                                {quizAnswers[`${selectedModule.id}-${qIndex}`] === oIndex && (
                                  <CheckCircle className="h-5 w-5 text-purple-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                    <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
                      Submit Answers
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 bg-[#12122a] rounded-lg border border-purple-900 p-12">
              <div className="text-center">
                <Shield className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <p className="text-xl">Select a module to begin learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modules;