import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          About Sarux Security
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Empowering the next generation of cybersecurity professionals through hands-on learning
          and practical experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#12122a] p-6 rounded-lg border border-purple-900"
        >
          <Shield className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-400">
            To provide accessible, high-quality cybersecurity education through
            practical, hands-on learning experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#12122a] p-6 rounded-lg border border-purple-900"
        >
          <Lock className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-4">Privacy First</h3>
          <p className="text-gray-400">
            Our no-database approach ensures your learning journey remains private
            and secure, with all progress stored locally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#12122a] p-6 rounded-lg border border-purple-900"
        >
          <Users className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
          <p className="text-gray-400">
            Join a growing community of security enthusiasts and professionals
            dedicated to sharing knowledge.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-[#12122a] p-8 rounded-lg border border-purple-900"
      >
        <h2 className="text-2xl font-semibold mb-4">Why Choose Sarux Security?</h2>
        <ul className="space-y-4 text-gray-400">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 text-purple-500 mr-2">•</span>
            <span>Browser-based learning platform - no software installation required</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 text-purple-500 mr-2">•</span>
            <span>Practical, hands-on challenges that simulate real-world scenarios</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 text-purple-500 mr-2">•</span>
            <span>Progressive learning path from beginner to advanced topics</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 text-purple-500 mr-2">•</span>
            <span>Regular updates with new challenges and learning materials</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default About;