import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  onStrengthChange?: (strength: number) => void;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  onStrengthChange
}) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      const issues: string[] = [];

      // Length check
      if (pwd.length < 8) {
        issues.push('Password should be at least 8 characters long');
      } else {
        score += pwd.length > 12 ? 2 : 1;
      }

      // Complexity checks
      if (/[A-Z]/.test(pwd)) score++;
      else issues.push('Add uppercase letters');
      
      if (/[a-z]/.test(pwd)) score++;
      else issues.push('Add lowercase letters');
      
      if (/[0-9]/.test(pwd)) score++;
      else issues.push('Add numbers');
      
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      else issues.push('Add special characters');

      // Common patterns check
      const commonPatterns = [
        '123', '456', '789', 'abc', 'qwerty', 'admin', 'password'
      ];
      if (commonPatterns.some(pattern => pwd.toLowerCase().includes(pattern))) {
        score--;
        issues.push('Avoid common patterns');
      }

      // Normalize score
      const normalizedScore = Math.max(0, Math.min(5, score));
      setStrength(normalizedScore);
      setFeedback(issues);
      if (onStrengthChange) onStrengthChange(normalizedScore);
    };

    calculateStrength(password);
  }, [password, onStrengthChange]);

  const getStrengthColor = () => {
    if (strength <= 1) return 'rgb(239, 68, 68)';
    if (strength <= 2) return 'rgb(234, 179, 8)';
    if (strength <= 3) return 'rgb(59, 130, 246)';
    return 'rgb(34, 197, 94)';
  };

  const getStrengthLabel = () => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-4">
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: getStrengthColor() }}
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        {strength > 3 ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        )}
        <span className="text-sm" style={{ color: getStrengthColor() }}>
          {getStrengthLabel()}
        </span>
      </div>

      {feedback.length > 0 && (
        <ul className="space-y-1">
          {feedback.map((issue, index) => (
            <li key={index} className="text-sm text-gray-400 flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              {issue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;