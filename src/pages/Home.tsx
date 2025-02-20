import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Shield, Lock, Code, Network, 
  Brain, Terminal, Fingerprint, Cpu, Zap,
  Target, Award, BookOpen, Puzzle, Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MatrixBackground from '../components/MatrixBackground';
import RotatingText from '../components/RotatingText';
import CryptoJS from 'crypto-js';

// Game implementations
const PasswordStrengthGame = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, feedback: '' });

  const checkStrength = (pass: string) => {
    let score = 0;
    const feedback = [];

    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 2) feedback.push('Very Weak');
    else if (score < 3) feedback.push('Weak');
    else if (score < 4) feedback.push('Medium');
    else if (score < 5) feedback.push('Strong');
    else feedback.push('Very Strong');

    return { score, feedback: feedback.join(', ') };
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setStrength(checkStrength(e.target.value));
        }}
        placeholder="Enter password to check"
        className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded text-white"
      />
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-green-500"
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-400">{strength.feedback}</span>
      </div>
    </div>
  );
};

const CipherGame = () => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState('');

  const caesarCipher = (text: string, shift: number) => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encrypt"
          className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded text-white"
        />
      </div>
      <div>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value) || 0)}
          placeholder="Shift amount"
          className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded text-white"
        />
      </div>
      <button
        onClick={() => setOutput(caesarCipher(input, shift))}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Encrypt
      </button>
      {output && (
        <div className="p-4 bg-[#1a1a2e] rounded border border-purple-900">
          <p className="text-purple-400">Encrypted: {output}</p>
        </div>
      )}
    </div>
  );
};

const NetworkGame = () => {
  const [nodes, setNodes] = useState(['Server', 'Client A', 'Client B']);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const simulateAttack = (node: string) => {
    setMessages(prev => [...prev, `Simulating attack on ${node}...`]);
    setTimeout(() => {
      setMessages(prev => [...prev, `Attack detected! Firewall blocked suspicious traffic to ${node}`]);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {nodes.map(node => (
          <button
            key={node}
            onClick={() => {
              setSelectedNode(node);
              simulateAttack(node);
            }}
            className={`p-4 rounded border ${
              selectedNode === node 
                ? 'border-purple-500 bg-purple-900/50' 
                : 'border-purple-900 hover:border-purple-700'
            }`}
          >
            {node}
          </button>
        ))}
      </div>
      <div className="h-40 overflow-y-auto p-4 bg-[#1a1a2e] rounded border border-purple-900">
        {messages.map((msg, i) => (
          <p key={i} className="text-sm text-gray-400">{msg}</p>
        ))}
      </div>
    </div>
  );
};

const BinaryGame = () => {
  const [binary, setBinary] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const generateBinary = () => {
    const text = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const binary = text.charCodeAt(0).toString(2).padStart(8, '0');
    setBinary(binary);
    setAnswer('');
  };

  useEffect(() => {
    generateBinary();
  }, []);

  const checkAnswer = () => {
    const correct = String.fromCharCode(parseInt(binary, 2));
    if (answer.toUpperCase() === correct) {
      setScore(s => s + 1);
      generateBinary();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>
      <div className="text-center text-2xl font-mono">{binary}</div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        placeholder="Enter the character"
        className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded text-white"
        maxLength={1}
      />
      <button
        onClick={checkAnswer}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Submit
      </button>
    </div>
  );
};

const HackDefenseGame = () => {
  const [health, setHealth] = useState(100);
  const [attacks, setAttacks] = useState<string[]>([]);
  const [defenses, setDefenses] = useState(['Firewall', 'IDS', 'Encryption']);
  const [activeDefenses, setActiveDefenses] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const attackTypes = ['SQL Injection', 'DDoS', 'Malware', 'XSS'];
      const newAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      setAttacks(prev => [...prev, newAttack]);
      
      if (!activeDefenses.length) {
        setHealth(h => Math.max(0, h - 10));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeDefenses]);

  return (
    <div className="space-y-4">
      <div className="h-2 bg-gray-700 rounded-full">
        <div 
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${health}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {defenses.map(defense => (
          <button
            key={defense}
            onClick={() => setActiveDefenses(prev => 
              prev.includes(defense) 
                ? prev.filter(d => d !== defense)
                : [...prev, defense]
            )}
            className={`p-2 rounded text-sm ${
              activeDefenses.includes(defense)
                ? 'bg-purple-600 text-white'
                : 'bg-[#1a1a2e] text-gray-400'
            }`}
          >
            {defense}
          </button>
        ))}
      </div>
      <div className="h-40 overflow-y-auto p-4 bg-[#1a1a2e] rounded border border-purple-900">
        {attacks.map((attack, i) => (
          <p key={i} className="text-sm text-gray-400">
            {attack} attack detected!
            {activeDefenses.length > 0 ? ' (Blocked)' : ' (Damage taken)'}
          </p>
        ))}
      </div>
    </div>
  );
};

const CryptoPuzzleGame = () => {
  const [puzzle, setPuzzle] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const puzzles = [
      {
        cipher: CryptoJS.AES.encrypt('SECURITY', 'key').toString(),
        answer: 'SECURITY'
      }
    ];
    const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
    setPuzzle(selected.cipher);
  }, []);

  const checkAnswer = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(puzzle, 'key').toString(CryptoJS.enc.Utf8);
      if (answer.toUpperCase() === decrypted) {
        setFeedback('Correct! You solved the puzzle!');
      } else {
        setFeedback('Try again!');
      }
    } catch (e) {
      setFeedback('Invalid decryption attempt');
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[#1a1a2e] rounded border border-purple-900 break-all">
        {puzzle}
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your solution"
        className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded text-white"
      />
      <button
        onClick={checkAnswer}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Submit
      </button>
      {feedback && (
        <p className="text-center text-purple-400">{feedback}</p>
      )}
    </div>
  );
};

const Home = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : {
      'quick-learner': { progress: 0 },
      'code-breaker': { progress: 0 },
      'security-expert': { progress: 0 }
    };
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const rotatingTexts = [
    "Unlock the Secrets of Digital Defense",
    "Master the Art of Cybersecurity",
    "Become a Security Expert",
    "Learn. Hack. Protect."
  ];

  const quickChallenges = [
    {
      id: 'password-strength',
      title: 'Password Strength Analyzer',
      description: 'Test the strength of passwords and learn best practices',
      icon: Lock,
      color: 'from-purple-500 to-blue-500',
      component: PasswordStrengthGame
    },
    {
      id: 'cipher-decoder',
      title: 'Cipher Decoder',
      description: 'Practice breaking simple substitution ciphers',
      icon: Code,
      color: 'from-green-500 to-teal-500',
      component: CipherGame
    },
    {
      id: 'network-sim',
      title: 'Network Simulator',
      description: 'Visualize and understand network attacks',
      icon: Network,
      color: 'from-red-500 to-orange-500',
      component: NetworkGame
    }
  ];

  const learningPaths = [
    {
      title: 'Beginner Path',
      description: 'Start your cybersecurity journey',
      icon: BookOpen,
      modules: ['Security Basics', 'Cryptography 101', 'Web Security'],
      color: 'from-green-400 to-emerald-500',
      progress: 30
    },
    {
      title: 'Advanced Path',
      description: 'Deep dive into complex security topics',
      icon: Brain,
      modules: ['Advanced Encryption', 'Penetration Testing', 'Malware Analysis'],
      color: 'from-purple-400 to-indigo-500',
      progress: 15
    },
    {
      title: 'Specialist Path',
      description: 'Become an expert in specific domains',
      icon: Target,
      modules: ['Network Security', 'Cloud Security', 'IoT Security'],
      color: 'from-red-400 to-pink-500',
      progress: 5
    }
  ];

  const miniGames = [
    {
      id: 'binary-blast',
      title: 'Binary Blast',
      description: 'Convert binary to text under time pressure',
      icon: Cpu,
      difficulty: 'Easy',
      component: BinaryGame
    },
    {
      id: 'hack-defense',
      title: 'Hack Defense',
      description: 'Protect your system from incoming attacks',
      icon: Shield,
      difficulty: 'Medium',
      component: HackDefenseGame
    },
    {
      id: 'crypto-puzzle',
      title: 'Crypto Puzzle',
      description: 'Solve cryptographic puzzles and challenges',
      icon: Puzzle,
      difficulty: 'Hard',
      component: CryptoPuzzleGame
    }
  ];

  const getGameComponent = () => {
    const game = [...quickChallenges, ...miniGames].find(g => g.id === activeGame);
    return game?.component ? <game.component /> : null;
  };

  return (
    <div className="relative">
      <MatrixBackground />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a16]/90 to-[#0a0a16] z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            <h1 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent inline-block">
              <RotatingText
                texts={rotatingTexts}
                mainClassName="text-white"
                rotationInterval={3000}
                staggerDuration={0.03}
              />
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Master ethical hacking and cryptography through interactive challenges
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-6"
          >
            <Link
              to="/modules"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all transform hover:scale-105"
            >
              Start Learning
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/challenges"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg text-purple-400 border-2 border-purple-500 hover:bg-purple-500/10 transition-all transform hover:scale-105"
            >
              View Challenges
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Challenges Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Quick Challenges
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#12122a] p-8 rounded-xl border border-purple-900 hover:border-purple-500 transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setActiveGame(challenge.id);
                setShowGameModal(true);
              }}
            >
              <div className={`bg-gradient-to-r ${challenge.color} p-3 rounded-lg inline-block mb-4`}>
                <challenge.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-gray-400">{challenge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="relative z-20 bg-[#0c0c1d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Learning Paths
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#12122a] rounded-xl border border-purple-900 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${path.color} p-6`}>
                  <path.icon className="h-12 w-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{path.title}</h3>
                  <p className="text-white/80">{path.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {path.modules.map((module, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-2" />
                        {module}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-purple-400">{path.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Games Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Security Mini Games
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {miniGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#12122a] p-6 rounded-xl border border-purple-900 hover:border-purple-500 transition-all cursor-pointer"
              onClick={() => {
                setActiveGame(game.id);
                setShowGameModal(true);
              }}
            >
              <game.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-400 mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-400">Difficulty: {game.difficulty}</span>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="relative z-20 bg-[#0c0c1d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Your Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#12122a] p-6 rounded-xl border border-purple-900"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold">Quick Learner</h3>
              </div>
              <p className="text-gray-400 mb-4">Complete your first module</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {achievements['quick-learner'].progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                  <div
                    style={{ width: `${achievements['quick-learner'].progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                  ></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#12122a] p-6 rounded-xl border border-purple-900"
            >
              <div className="flex items-center mb-4">
                <Terminal className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold">Code Breaker</h3>
              </div>
              <p className="text-gray-400 mb-4">Solve 5 cryptography challenges</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {achievements['code-breaker'].progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                  <div
                    style={{ width: `${achievements['code-breaker'].progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                  ></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#12122a] p-6 rounded-xl border border-purple-900"
            >
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold">Security Expert</h3>
              </div>
              <p className="text-gray-400 mb-4">Master all basic security concepts</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {achievements['security-expert'].progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                  <div
                    style={{ width: `${achievements['security-expert'].progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
         </div>
      </div>

      {/* Game Modal */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#12122a] rounded-xl border border-purple-900 p-6 max-w-2xl w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                {[...miniGames, ...quickChallenges].find(g => g.id === activeGame)?.title}
              </h3>
              <button
                onClick={() => setShowGameModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="py-6">
              {getGameComponent()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;