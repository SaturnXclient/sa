import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trophy, Terminal as TerminalIcon, CheckCircle2, Lock, Globe, Network, Database, Bug } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import LetterGlitch from '../components/LetterGlitch';
import Terminal from '../components/Terminal';
import CodeEditor from '../components/CodeEditor';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  category: string;
  tools: string[];
  content: {
    description: string;
    hint: string;
    code?: string;
    solution: string;
  };
}

const challenges: Challenge[] = [
  {
    id: "crack-vault",
    title: "Crack the Vault",
    description: "Test your cryptography skills by breaking into a secure digital vault.",
    difficulty: "Medium",
    points: 500,
    category: "Cryptography",
    tools: ["CryptoJS", "Base64", "ROT13"],
    content: {
      description: `# The Digital Vault Challenge

You've discovered an encrypted vault containing sensitive information. Your task is to decrypt the message using the following clues:

1. The encryption uses a simple substitution cipher
2. The key is related to the word "SECURITY"
3. Each letter is shifted by a constant value

## Tools Available
- ROT13 Decoder
- Base64 Decoder
- Frequency Analysis Tool`,
      hint: "Try analyzing the frequency of letters in the encrypted message",
      code: `
const encryptedMessage = "MYWLYL MYWOLCM";
// Your decryption code here
function decryptVault(message) {
  // Implement your solution
  return "";
}`,
      solution: "SYSTEM SECURED"
    }
  },
  {
    id: "web-infiltration",
    title: "Web Infiltration",
    description: "Find and exploit vulnerabilities in a mock web application.",
    difficulty: "Hard",
    points: 750,
    category: "Web Security",
    tools: ["SQL Map", "XSS Scanner", "Cookie Editor"],
    content: {
      description: `# Web Infiltration Challenge

You've discovered a vulnerable login form. Your task is to:

1. Identify the vulnerability type
2. Craft a payload to bypass authentication
3. Document the security fix

## Available Tools
- SQL Injection Tester
- XSS Payload Generator
- Cookie Manipulation Tools`,
      hint: "Look for SQL injection vulnerabilities in the login query",
      code: `
// Vulnerable login query
const query = \`SELECT * FROM users 
  WHERE username = '\${username}' 
  AND password = '\${password}'\`;`,
      solution: "' OR '1'='1"
    }
  },
  {
    id: "network-breach",
    title: "Network Breach",
    description: "Identify and exploit network vulnerabilities in a simulated environment.",
    difficulty: "Expert",
    points: 1000,
    category: "Network Security",
    tools: ["Wireshark", "Nmap", "Netcat"],
    content: {
      description: `# Network Breach Challenge

A company's network has been compromised. Your task is to:

1. Analyze network traffic
2. Identify suspicious patterns
3. Locate the breach point
4. Suggest security improvements

## Available Tools
- Network Traffic Analyzer
- Port Scanner
- Packet Capture Tool`,
      hint: "Check for unusual port activity and suspicious data patterns",
      code: `
// Network analysis snippet
const packetCapture = {
  source: "192.168.1.100",
  destination: "10.0.0.50",
  port: 4444,
  data: "base64encoded..."
};`,
      solution: "BACKDOOR_ON_PORT_4444"
    }
  }
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCommand = (command: string) => {
    // Handle terminal commands
    console.log('Command executed:', command);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <LetterGlitch
          text="Security Challenges"
          glitchSpeed={50}
          centerVignette={true}
          smooth={true}
        />
        <p className="text-gray-400 max-w-2xl mx-auto mt-4">
          Put your skills to the test with our interactive security challenges.
          Each challenge simulates real-world scenarios using professional security tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br from-[#12122a] to-[#1a1a2e] rounded-lg border cursor-pointer transition-all transform hover:scale-102 hover:shadow-xl ${
                  selectedChallenge?.id === challenge.id ? 'border-purple-500 shadow-purple-500/20' : 'border-purple-900 hover:border-purple-700'
                }`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-yellow-500">{challenge.points} pts</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{challenge.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-900/30 rounded-md text-xs text-purple-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-sm ${
                      challenge.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                      challenge.difficulty === 'Hard' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {challenge.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedChallenge ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#12122a] to-[#1a1a2e] rounded-lg border border-purple-900 overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <div className="prose prose-invert max-w-none mb-6">
                  <ReactMarkdown>
                    {selectedChallenge.content.description}
                  </ReactMarkdown>
                </div>

                <div className="space-y-6">
                  <CodeEditor
                    value={selectedChallenge.content.code || ''}
                    language="javascript"
                    onChange={setCode}
                  />

                  <Terminal
                    initialCommands={[]}
                    onCommand={handleCommand}
                  />

                  {selectedChallenge.category === 'Cryptography' && (
                    <div className="bg-[#1a1a2e] p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Password Strength Analysis</h3>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-[#12122a] border border-purple-900 rounded-lg mb-4"
                        placeholder="Enter password to analyze"
                      />
                      <PasswordStrengthMeter password={password} />
                    </div>
                  )}

                  {feedback && (
                    <div
                      className={`p-4 rounded-lg ${
                        feedback.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-red-900/50 text-red-400 border border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center">
                        {feedback.type === 'success' ? (
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                        ) : (
                          <TerminalIcon className="h-5 w-5 mr-2" />
                        )}
                        {feedback.message}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        if (code.trim().toUpperCase() === selectedChallenge.content.solution.trim().toUpperCase()) {
                          setFeedback({ type: 'success', message: 'Congratulations! You solved the challenge!' });
                        } else {
                          setFeedback({ type: 'error', message: 'Incorrect solution. Try again!' });
                        }
                      }}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Submit Solution
                    </button>
                    <button
                      onClick={() => setFeedback({ type: 'error', message: selectedChallenge.content.hint })}
                      className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
                    >
                      Get Hint
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 bg-[#12122a] rounded-lg border border-purple-900 p-12">
              <div className="text-center">
                <Shield className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <p className="text-xl">Select a challenge to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;