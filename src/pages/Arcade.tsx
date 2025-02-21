import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Trophy, Target, Brain, Shield, Terminal, Lock } from 'lucide-react';
import LetterGlitch from '../components/LetterGlitch';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  maxPlayers: number;
  category: string;
  maxScore: number;
  instructions: string;
  game: React.FC;
}

const CipherBreaker: React.FC = () => {
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const target = "HELLO WORLD";
  const encrypted = "KHOOR ZRUOG"; // Simple Caesar cipher (shift by 3)

  const handleSubmit = () => {
    if (input.toUpperCase() === target) {
      setScore(prev => prev + 100);
      setInput('');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <p>Decrypt: {encrypted}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 bg-[#1a1a2e] border border-purple-900 rounded"
        placeholder="Enter decrypted text"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
      >
        Submit
      </button>
      <p>Score: {score}</p>
    </div>
  );
};

const PortScanner: React.FC = () => {
  const [ports, setPorts] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const openPorts = [80, 443, 22];

  const scanPort = (port: number) => {
    if (openPorts.includes(port) && !ports.includes(port)) {
      setPorts(prev => [...prev, port]);
      setScore(prev => prev + 50);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 20 }, (_, i) => (
          <button
            key={i}
            onClick={() => scanPort(i + 20)}
            className={`p-2 ${ports.includes(i + 20) ? 'bg-green-600' : 'bg-[#1a1a2e]'} border border-purple-900 rounded`}
          >
            Port {i + 20}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

const games: Game[] = [
  {
    id: 'cipher-breaker',
    title: 'Cipher Breaker',
    description: 'Decrypt encoded messages using various cipher techniques',
    icon: Lock,
    difficulty: 'Easy',
    maxPlayers: 1,
    category: 'Cryptography',
    maxScore: 1000,
    instructions: 'Decrypt the given message using the Caesar cipher. Each correct decryption earns 100 points.',
    game: CipherBreaker
  },
  {
    id: 'port-scanner',
    title: 'Port Scanner',
    description: 'Find open ports in a simulated network environment',
    icon: Target,
    difficulty: 'Medium',
    maxPlayers: 1,
    category: 'Network Security',
    maxScore: 1500,
    instructions: 'Scan ports to find open services. Each discovered open port earns 50 points.',
    game: PortScanner
  }
];

const Arcade = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <LetterGlitch
          text="Cyber Arcade"
          glitchSpeed={50}
          centerVignette={true}
          smooth={true}
        />
        <p className="text-gray-400 mt-4">
          Test your security skills with interactive games and challenges
        </p>
      </motion.div>

      {selectedGame ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#12122a] rounded-lg border border-purple-900 overflow-hidden"
        >
          <div className="border-b border-purple-900 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <selectedGame.icon className="h-8 w-8 text-purple-500 mr-4" />
                <div>
                  <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                  <p className="text-gray-400">{selectedGame.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
              >
                Exit Game
              </button>
            </div>
            <p className="mt-4 text-gray-300">{selectedGame.instructions}</p>
          </div>
          <selectedGame.game />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#12122a] rounded-lg border border-purple-900 overflow-hidden cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <game.icon className="h-8 w-8 text-purple-500 mr-4" />
                  <h3 className="text-xl font-bold">{game.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      game.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                      game.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {game.difficulty}
                    </span>
                    <span className="text-purple-400">
                      {game.maxPlayers} Player{game.maxPlayers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-yellow-500">{game.maxScore}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Arcade;