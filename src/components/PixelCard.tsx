import React from 'react';
import { motion } from 'framer-motion';

interface PixelCardProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

const PixelCard: React.FC<PixelCardProps> = ({
  title,
  description,
  image,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-[#12122a] opacity-90" />
      
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      <div className="relative z-20 p-6">
        <div className="pixel-corners">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .pixel-corners {
          clip-path: polygon(
            0 4px,
            4px 4px,
            4px 0,
            calc(100% - 4px) 0,
            calc(100% - 4px) 4px,
            100% 4px,
            100% calc(100% - 4px),
            calc(100% - 4px) calc(100% - 4px),
            calc(100% - 4px) 100%,
            4px 100%,
            4px calc(100% - 4px),
            0 calc(100% - 4px)
          );
        }
      `}</style>
    </motion.div>
  );
};

export default PixelCard;