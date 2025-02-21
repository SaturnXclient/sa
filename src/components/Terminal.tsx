import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalProps {
  initialCommands?: string[];
  onCommand?: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ initialCommands = [], onCommand }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#12122a',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selection: 'rgba(255, 255, 255, 0.3)',
        black: '#000000',
        red: '#ff0000',
        green: '#33ff00',
        yellow: '#ffff00',
        blue: '#0066ff',
        magenta: '#cc00ff',
        cyan: '#00ffff',
        white: '#d0d0d0',
        brightBlack: '#808080',
        brightRed: '#ff0000',
        brightGreen: '#33ff00',
        brightYellow: '#ffff00',
        brightBlue: '#0066ff',
        brightMagenta: '#cc00ff',
        brightCyan: '#00ffff',
        brightWhite: '#ffffff'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;

    term.writeln('Sarux Security Terminal v1.0.0');
    term.writeln('Type "help" for available commands');
    term.writeln('');

    let commandBuffer = '';
    const prompt = '$ ';

    const writePrompt = () => {
      term.write('\r\n' + prompt);
    };

    initialCommands.forEach(cmd => {
      term.writeln(prompt + cmd);
      if (onCommand) onCommand(cmd);
    });

    writePrompt();

    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.keyCode === 13) { // Enter
        if (commandBuffer.trim()) {
          if (onCommand) onCommand(commandBuffer);
          commandBuffer = '';
        }
        writePrompt();
      } else if (domEvent.keyCode === 8) { // Backspace
        if (commandBuffer.length > 0) {
          commandBuffer = commandBuffer.slice(0, -1);
          term.write('\b \b');
        }
      } else if (printable) {
        commandBuffer += key;
        term.write(key);
      }
    });

    return () => {
      term.dispose();
    };
  }, [initialCommands, onCommand]);

  return <div ref={terminalRef} className="h-96 rounded-lg overflow-hidden" />;
};

export default Terminal;