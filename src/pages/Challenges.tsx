import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Trophy, Terminal, CheckCircle2 } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import LetterGlitch from '../components/LetterGlitch';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  category: string;
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
    content: {
      description: `# The Digital Vault Challenge

You've discovered an encrypted vault containing sensitive information. Your task is to decrypt the message using the following clues:

1. The encryption uses a simple substitution cipher
2. The key is related to the word "SECURITY"
3. Each letter is shifted by a constant value`,
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
    content: {
      description: `# Web Infiltration Challenge

You've discovered a vulnerable login form. Your task is to:

1. Identify the vulnerability type
2. Craft a payload to bypass authentication
3. Document the security fix`,
      hint: "Look for SQL injection vulnerabilities in the login query",
      code: `
// Vulnerable login query
const query = \`SELECT * FROM users 
  WHERE username = '\${username}' 
  AND password = '\${password}'\`;`,
      solution: "' OR '1'='1"
    }
  }
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userSolution, setUserSolution] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = () => {
    if (!selectedChallenge) return;
    
    if (userSolution.trim().toUpperCase() === selectedChallenge.content.solution.trim().toUpperCase()) {
      setFeedback({ type: 'success', message: 'Congratulations! You solved the challenge!' });
    } else {
      setFeedback({ type: 'error', message: 'Incorrect solution. Try again!' });
    }
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
          Each challenge is designed to test different aspects of cybersecurity knowledge.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-[#12122a] rounded-lg border cursor-pointer transition-all ${
                  selectedChallenge?.id === challenge.id ? 'border-purple-500' : 'border-purple-900 hover:border-purple-700'
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
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-purple-900 rounded text-sm">
                      {challenge.category}
                    </span>
                    <span className="text-purple-400 text-sm">
                      Difficulty: {challenge.difficulty}
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
              className="bg-[#12122a] rounded-lg border border-purple-900"
            >
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {selectedChallenge.content.description}
                  </ReactMarkdown>
                </div>

                {selectedChallenge.content.code && (
                  <div className="mt-6">
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomOneDark}
                      className="rounded-lg"
                    >
                      {selectedChallenge.content.code}
                    </SyntaxHighlighter>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Solution
                    </label>
                    <textarea
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      className="w-full px-4 py-2 bg-[#1a1a2e] border border-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100"
                      rows={4}
                    />
                  </div>

                  {feedback && (
                    <div
                      className={`p-4 rounded-lg ${
                        feedback.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                      }`}
                    >
                      <div className="flex items-center">
                        {feedback.type === 'success' ? (
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                        ) : (
                          <Terminal className="h-5 w-5 mr-2" />
                        )}
                        {feedback.message}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Select a challenge to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;