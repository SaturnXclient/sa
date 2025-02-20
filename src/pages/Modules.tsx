import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Globe, Network, FileCode, ChevronRight, CheckCircle,
  Binary, Database, Shield, Cpu, Cloud, Wifi, Terminal,
  Bug, Key, Radio, Server, Smartphone, Code, AlertTriangle
} from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: string;
  duration: string;
  category: string;
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
    id: 'binary',
    title: "Binary & Number Systems",
    description: "Master binary, hexadecimal, and octal number systems",
    icon: Binary,
    difficulty: "Beginner",
    duration: "2 hours",
    category: "Fundamentals",
    content: {
      theory: `# Understanding Binary

Binary is the foundation of all computing. Let's explore how it works:

## Binary Basics
- Binary only uses 0s and 1s
- Each position represents a power of 2
- Count from right to left: 2^0, 2^1, 2^2, etc.

## Binary to Decimal Conversion
\`\`\`
Binary: 1101
Decimal: (1×2³) + (1×2²) + (0×2¹) + (1×2⁰)
        = 8 + 4 + 0 + 1
        = 13
\`\`\`

## ASCII Encoding
Each character has a binary representation:
\`\`\`
A = 01000001
B = 01000010
C = 01000011
\`\`\``,
      practice: `
// Convert this binary number to decimal
const binary = "1010";

function binaryToDecimal(bin) {
  // Your code here
  return 0;
}`,
      quiz: [
        {
          question: "What is the decimal value of binary 1010?",
          options: ["8", "10", "12", "14"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'crypto',
    title: "Cryptography Fundamentals",
    description: "Learn the basics of encryption, hashing, and secure communication protocols",
    icon: Lock,
    difficulty: "Beginner",
    duration: "4 hours",
    category: "Security",
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
\`\`\``,
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
    id: 'sql',
    title: "SQL Injection Prevention",
    description: "Learn to identify and prevent SQL injection attacks",
    icon: Database,
    difficulty: "Intermediate",
    duration: "3 hours",
    category: "Web Security",
    content: {
      theory: `# SQL Injection Prevention

SQL injection is one of the most common web vulnerabilities. Let's learn how to prevent it:

## Common Vulnerabilities
\`\`\`sql
-- Vulnerable query
SELECT * FROM users WHERE username = '$username' AND password = '$password'

-- Attack input
username: admin' --
password: anything
\`\`\`

## Prevention Techniques
1. Use Prepared Statements
2. Input Validation
3. Parameterized Queries

\`\`\`javascript
// Safe query using prepared statement
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(query, [username, password]);
\`\`\``,
      practice: `
// Fix this vulnerable query
function login(username, password) {
  const query = \`SELECT * FROM users 
    WHERE username = '\${username}' 
    AND password = '\${password}'\`;
  return db.query(query);
}`,
      quiz: [
        {
          question: "Which is the best way to prevent SQL injection?",
          options: [
            "Remove all quotes from user input",
            "Use prepared statements",
            "Block special characters",
            "Encrypt the database"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'xss',
    title: "Cross-Site Scripting (XSS)",
    description: "Understand and prevent XSS vulnerabilities",
    icon: Code,
    difficulty: "Intermediate",
    duration: "3 hours",
    category: "Web Security",
    content: {
      theory: `# Cross-Site Scripting (XSS)

XSS allows attackers to inject malicious scripts into web pages. Learn how to prevent it:

## Types of XSS
1. Reflected XSS
2. Stored XSS
3. DOM-based XSS

## Prevention
\`\`\`javascript
// Unsafe
element.innerHTML = userInput;

// Safe
element.textContent = userInput;

// Using DOMPurify
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean;
\`\`\``,
      practice: `
// Implement XSS prevention for this function
function displayComment(comment) {
  const container = document.getElementById('comments');
  container.innerHTML = comment; // Fix this!
}`,
      quiz: [
        {
          question: "Which method safely displays user input?",
          options: [
            "innerHTML",
            "textContent",
            "innerText",
            "All of the above"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'network',
    title: "Network Security",
    description: "Learn about network protocols, attacks, and defenses",
    icon: Network,
    difficulty: "Advanced",
    duration: "6 hours",
    category: "Security",
    content: {
      theory: `# Network Security Fundamentals

Understanding network security is crucial for protecting systems:

## Common Attacks
1. Man-in-the-Middle (MITM)
2. DDoS Attacks
3. Port Scanning

## Defense Strategies
\`\`\`javascript
// Example: Port scanning detection
function detectPortScan(connections) {
  const threshold = 10;
  const timeWindow = 60000; // 1 minute
  
  return connections.filter(conn => 
    conn.count > threshold && 
    conn.timespan < timeWindow
  );
}
\`\`\``,
      practice: `
// Implement a simple port scan detector
function isPortScan(connections) {
  // Your code here
  return false;
}`,
      quiz: [
        {
          question: "What is a common sign of a port scan?",
          options: [
            "Multiple connection attempts to different ports",
            "Large data transfers",
            "High latency",
            "Server errors"
          ],
          correctAnswer: 0
        }
      ]
    }
  }
];

const Modules = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'quiz'>('theory');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(modules.map(m => m.category))];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  const handleQuizSubmit = (moduleId: string, questionIndex: number, selectedAnswer: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const isCorrect = selectedAnswer === module.content.quiz[questionIndex].correctAnswer;
    setQuizResults(prev => ({
      ...prev,
      [`${moduleId}-${questionIndex}`]: isCorrect
    }));
    setQuizAnswers(prev => ({
      ...prev,
      [`${moduleId}-${questionIndex}`]: selectedAnswer
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Learning Modules
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Start your journey into cybersecurity with our comprehensive learning modules.
          Each module is designed to build your skills progressively.
        </p>
      </motion.div>

      <div className="mb-8 flex justify-center space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:bg-purple-900/50'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-[#12122a] p-6 rounded-lg border cursor-pointer transition-all ${
                  selectedModule?.id === module.id ? 'border-purple-500' : 'border-purple-900 hover:border-purple-700'
                }`}
                onClick={() => setSelectedModule(module)}
              >
                <div className="flex items-start">
                  <module.icon className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-purple-400">Difficulty: {module.difficulty}</span>
                      <span className="text-purple-400">Duration: {module.duration}</span>
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
              className="bg-[#12122a] rounded-lg border border-purple-900 overflow-hidden"
            >
              <div className="border-b border-purple-900">
                <div className="flex space-x-1 p-4">
                  {(['theory', 'practice', 'quiz'] as const).map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab
                          ? 'bg-purple-600 text-white'
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
                    <ReactMarkdown
                      components={{
                        code: ({ node, inline, className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              language={match[1]}
                              style={atomOneDark}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {selectedModule.content.theory}
                    </ReactMarkdown>
                  </div>
                )}

                {activeTab === 'practice' && (
                  <div>
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomOneDark}
                      className="rounded-lg"
                    >
                      {selectedModule.content.practice}
                    </SyntaxHighlighter>
                    <div className="mt-6">
                      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Run Code
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-8">
                    {selectedModule.content.quiz.map((question, qIndex) => (
                      <div key={qIndex} className="space-y-4">
                        <h3 className="text-lg font-semibold">{question.question}</h3>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              onClick={() => handleQuizSubmit(selectedModule.id, qIndex, oIndex)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                quizAnswers[`${selectedModule.id}-${qIndex}`] === oIndex
                                  ? quizResults[`${selectedModule.id}-${qIndex}`]
                                    ? 'border-green-500 bg-green-900/50'
                                    : 'border-red-500 bg-red-900/50'
                                  : 'border-purple-900 hover:border-purple-700'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="flex-1">{option}</div>
                                {quizAnswers[`${selectedModule.id}-${qIndex}`] === oIndex && (
                                  <CheckCircle className={`h-5 w-5 ${
                                    quizResults[`${selectedModule.id}-${qIndex}`]
                                      ? 'text-green-400'
                                      : 'text-red-400'
                                  }`} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Select a module to begin learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modules;