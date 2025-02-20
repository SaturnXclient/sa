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
import Carousel from '../components/Carousel';
import PixelCard from '../components/PixelCard';
import Lanyard from '../components/Lanyard';
import CryptoJS from 'crypto-js';

// ... (keep all the existing game implementations)

const Home = () => {
  // ... (keep all existing state)
  const [showLanyard, setShowLanyard] = useState(true);

  const carouselItems = [
    {
      id: '1',
      content: (
        <div className="bg-[#12122a] p-8 rounded-lg border border-purple-900">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Master Ethical Hacking
          </h2>
          <p className="text-gray-300 mb-6">
            Learn the art of ethical hacking through hands-on exercises and real-world scenarios.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Learning
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      )
    },
    {
      id: '2',
      content: (
        <div className="bg-[#12122a] p-8 rounded-lg border border-purple-900">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Cryptography Mastery
          </h2>
          <p className="text-gray-300 mb-6">
            Dive deep into modern cryptography and secure communication protocols.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Explore Cryptography
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      )
    },
    {
      id: '3',
      content: (
        <div className="bg-[#12122a] p-8 rounded-lg border border-purple-900">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Web Security
          </h2>
          <p className="text-gray-300 mb-6">
            Learn to identify and prevent common web vulnerabilities.
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Securing
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      {showLanyard && (
        <Lanyard
          message="🎉 Special Launch Offer: Get 30% off on all premium courses!"
          discount="USE CODE: LAUNCH30"
          onClose={() => setShowLanyard(false)}
        />
      )}

      <MatrixBackground />

      {/* Hero Section */}
      <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${showLanyard ? 'pt-16' : ''}`}>
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
          
          <div className="mb-12">
            <Carousel
              items={carouselItems}
              autoPlay={true}
              interval={5000}
              className="h-[300px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <PixelCard
              title="Ethical Hacking"
              description="Master the art of ethical hacking and penetration testing"
              className="bg-gradient-to-br from-purple-500/10 to-transparent"
            />
            <PixelCard
              title="Cryptography"
              description="Learn modern encryption and secure communication"
              className="bg-gradient-to-br from-blue-500/10 to-transparent"
            />
            <PixelCard
              title="Web Security"
              description="Protect web applications from common vulnerabilities"
              className="bg-gradient-to-br from-green-500/10 to-transparent"
            />
          </div>

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
                  />
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
                  />
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
                  />
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