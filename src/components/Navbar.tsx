import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Gamepad } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#12122a] border-b border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Sarux Security
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/modules" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Learning Modules</Link>
              <Link to="/challenges" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Challenges</Link>
              <Link to="/arcade" className="flex items-center hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">
                <Gamepad className="h-4 w-4 mr-1" />
                Arcade
              </Link>
              <Link to="/about" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/modules" className="hover:bg-purple-900 block px-3 py-2 rounded-md text-base font-medium">Learning Modules</Link>
            <Link to="/challenges" className="hover:bg-purple-900 block px-3 py-2 rounded-md text-base font-medium">Challenges</Link>
            <Link to="/arcade" className="hover:bg-purple-900 block px-3 py-2 rounded-md text-base font-medium flex items-center">
              <Gamepad className="h-4 w-4 mr-2" />
              Arcade
            </Link>
            <Link to="/about" className="hover:bg-purple-900 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="hover:bg-purple-900 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;