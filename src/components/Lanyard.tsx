import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LanyardProps {
  message: string;
  discount?: string;
  onClose?: () => void;
}

const Lanyard: React.FC<LanyardProps> = ({
  message,
  discount,
  onClose
}) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">{message}</span>
          {discount && (
            <span className="px-2 py-1 bg-white/20 rounded text-sm font-bold">
              {discount}
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Lanyard;