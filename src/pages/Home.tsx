import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Shield, Lock, Code, Network, 
  Brain, Terminal, Fingerprint, Cpu, Zap,
  Target, Award, BookOpen, Puzzle, Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MatrixBackground from '../components/MatrixBackground';
import RotatingText from '../components/RotatingText';

const Home = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);

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
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'cipher-decoder',
      title: 'Cipher Decoder',
      description: 'Practice breaking simple substitution ciphers',
      icon: Code,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'network-sim',
      title: 'Network Simulator',
      description: 'Visualize and understand network attacks',
      icon: Network,
      color: 'from-red-500 to-orange-500'
    }
  ];

  const learningPaths = [
    {
      title: 'Beginner Path',
      description: 'Start your cybersecurity journey',
      icon: BookOpen,
      modules: ['Security Basics', 'Cryptography 101', 'Web Security'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Advanced Path',
      description: 'Deep dive into complex security topics',
      icon: Brain,
      modules: ['Advanced Encryption', 'Penetration Testing', 'Malware Analysis'],
      color: 'from-purple-400 to-indigo-500'
    },
    {
      title: 'Specialist Path',
      description: 'Become an expert in specific domains',
      icon: Target,
      modules: ['Network Security', 'Cloud Security', 'IoT Security'],
      color: 'from-red-400 to-pink-500'
    }
  ];

  const miniGames = [
    {
      id: 'binary-blast',
      title: 'Binary Blast',
      description: 'Convert binary to text under time pressure',
      icon: Cpu,
      difficulty: 'Easy'
    },
    {
      id: 'hack-defense',
      title: 'Hack Defense',
      description: 'Protect your system from incoming attacks',
      icon: Shield,
      difficulty: 'Medium'
    },
    {
      id: 'crypto-puzzle',
      title: 'Crypto Puzzle',
      description: 'Solve cryptographic puzzles and challenges',
      icon: Puzzle,
      difficulty: 'Hard'
    }
  ];

  const achievements = [
    {
      title: 'Quick Learner',
      description: 'Complete your first module',
      icon: Zap,
      progress: 75
    },
    {
      title: 'Code Breaker',
      description: 'Solve 5 cryptography challenges',
      icon: Terminal,
      progress: 40
    },
    {
      title: 'Security Expert',
      description: 'Master all basic security concepts',
      icon: Award,
      progress: 60
    }
  ];

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
            <RotatingText
              texts={rotatingTexts}
              mainClassName="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
              rotationInterval={3000}
              staggerDuration={0.03}
            />
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
                  <button className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Start Path
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
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#12122a] p-6 rounded-xl border border-purple-900"
              >
                <div className="flex items-center mb-4">
                  <achievement.icon className="h-8 w-8 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold">{achievement.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{achievement.description}</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {achievement.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: `${achievement.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                {miniGames.find(g => g.id === activeGame)?.title || 
                 quickChallenges.find(c => c.id === activeGame)?.title}
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
            <div className="text-center py-12">
              <p className="text-gray-400">Game content will be implemented here</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;