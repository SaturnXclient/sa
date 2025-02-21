import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Shield, Lock, Code, Network, 
  Brain, Terminal, Fingerprint, Cpu,
  Target, BookOpen, Database, Bug, Eye,
  Server, Wifi, Globe, FileCode, Key,
  Gamepad
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MatrixBackground from '../components/MatrixBackground';
import RotatingText from '../components/RotatingText';

const Home = () => {
  const titleTexts = [
    "Master Ethical Hacking",
    "Learn Cybersecurity",
    "Become a Security Expert",
    "Join the Elite"
  ];

  const learningPaths = [
    {
      title: "Network Security",
      icon: Network,
      description: "Master network penetration testing and security analysis",
      modules: [
        "Network Scanning Techniques",
        "Vulnerability Assessment",
        "Wireless Network Security",
        "Network Protocol Analysis"
      ]
    },
    {
      title: "Web Security",
      icon: Globe,
      description: "Learn web application security and penetration testing",
      modules: [
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "CSRF Attacks",
        "Security Headers"
      ]
    },
    {
      title: "Cryptography",
      icon: Lock,
      description: "Understand encryption, hashing, and cryptographic attacks",
      modules: [
        "Symmetric Encryption",
        "Public Key Cryptography",
        "Hash Functions",
        "Digital Signatures"
      ]
    },
    {
      title: "System Security",
      icon: Shield,
      description: "Explore system hardening and vulnerability assessment",
      modules: [
        "OS Security",
        "Privilege Escalation",
        "Malware Analysis",
        "System Hardening"
      ]
    }
  ];

  const practicalChallenges = [
    {
      title: "SQL Injection Lab",
      icon: Database,
      difficulty: "Beginner",
      description: "Practice SQL injection techniques in a safe environment",
      category: "Web Security"
    },
    {
      title: "Network Scanner",
      icon: Wifi,
      difficulty: "Intermediate",
      description: "Build your own network scanning tool",
      category: "Network Security"
    },
    {
      title: "Password Cracker",
      icon: Key,
      difficulty: "Advanced",
      description: "Implement various password cracking techniques",
      category: "Cryptography"
    },
    {
      title: "XSS Challenge",
      icon: Code,
      difficulty: "Beginner",
      description: "Find and exploit XSS vulnerabilities",
      category: "Web Security"
    },
    {
      title: "Reverse Engineering",
      icon: Bug,
      difficulty: "Advanced",
      description: "Analyze and understand compiled programs",
      category: "System Security"
    },
    {
      title: "Protocol Analysis",
      icon: Terminal,
      difficulty: "Intermediate",
      description: "Analyze and exploit network protocols",
      category: "Network Security"
    }
  ];

  const tools = [
    {
      name: "Network Analysis",
      icon: Network,
      tools: ["Wireshark", "Nmap", "Netcat", "TCPDump"]
    },
    {
      name: "Web Security",
      icon: Globe,
      tools: ["Burp Suite", "OWASP ZAP", "Nikto", "Dirb"]
    },
    {
      name: "System Security",
      icon: Shield,
      tools: ["Metasploit", "John the Ripper", "Hashcat", "Hydra"]
    },
    {
      name: "Forensics",
      icon: Eye,
      tools: ["Autopsy", "Volatility", "dd", "Sleuth Kit"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a16]">
      <MatrixBackground />

      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-[#0a0a16]/90 to-[#0a0a16] z-10"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            <RotatingText
              texts={titleTexts}
              className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
              staggerDuration={0.03}
              rotationInterval={4000}
            />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            Learn cybersecurity through hands-on practice and real-world scenarios
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/arcade"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Gamepad className="mr-2 h-6 w-6" />
              Enter Cyber Arcade
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#12122a] rounded-xl border border-purple-900 overflow-hidden hover:border-purple-500 transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-600/50 transition-colors">
                    <path.icon className="h-8 w-8 text-purple-400 group-hover:text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-gray-400 mb-4">{path.description}</p>
                <ul className="space-y-2">
                  {path.modules.map((module, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <ChevronRight className="h-4 w-4 text-purple-500 mr-2" />
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Practical Challenges */}
      <div className="relative z-20 bg-[#0c0c1d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Practical Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#12122a] p-6 rounded-xl border border-purple-900 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-600/50 transition-colors">
                    <challenge.icon className="h-8 w-8 text-purple-400 group-hover:text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-sm ${
                    challenge.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                    challenge.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-red-900/50 text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-purple-400 text-sm">{challenge.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Tools */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Essential Security Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#12122a] p-6 rounded-xl border border-purple-900"
            >
              <div className="flex items-center mb-4">
                <category.icon className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-bold">{category.name}</h3>
              </div>
              <ul className="space-y-2">
                {category.tools.map((tool, idx) => (
                  <li key={idx} className="text-gray-400 flex items-center">
                    <ChevronRight className="h-4 w-4 text-purple-500 mr-2" />
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;