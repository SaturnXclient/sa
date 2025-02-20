import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Globe, Network, FileCode, ChevronRight, CheckCircle } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import LetterGlitch from '../components/LetterGlitch';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: string;
  duration: string;
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
    id: 'web',
    title: "Web Security Exploits",
    description: "Understand common web vulnerabilities and how to protect against them.",
    icon: Globe,
    difficulty: "Intermediate",
    duration: "6 hours",
    content: {
      theory: `# Web Security Fundamentals

Learn about common web vulnerabilities and how to prevent them:

## Cross-Site Scripting (XSS)
XSS attacks occur when malicious scripts are injected into trusted websites.

\`\`\`javascript
// Vulnerable code
element.innerHTML = userInput;

// Safe code
element.textContent = userInput;
\`\`\``,
      practice: `
// Identify the vulnerability in this code
function displayComment(comment) {
  document.getElementById('comments').innerHTML = comment;
}`,
      quiz: [
        {
          question: "Which of the following is a common XSS prevention technique?",
          options: [
            "Using innerHTML for user input",
            "Escaping special characters",
            "Storing passwords in cookies",
            "Disabling JavaScript"
          ],
          correctAnswer: 1
        }
      ]
    }
  }
];

const Modules = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'quiz'>('theory');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LetterGlitch
          text="Learning Modules"
          glitchSpeed={50}
          centerVignette={true}
          smooth={true}
        />
        <p className="text-gray-400 mt-4 mb-12">
          Start your journey into cybersecurity with our comprehensive learning modules.
          Each module is designed to build your skills progressively.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {modules.map((module, index) => (
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
                      className={`px-4 py-2 rounded-lg ${
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
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                quizAnswers[`${selectedModule.id}-${qIndex}`] === oIndex
                                  ? 'border-purple-500 bg-purple-900/50'
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
                      </div>
                    ))}
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Submit Answers
                    </button>
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