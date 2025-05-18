import React from 'react';
import { History, ArrowUpRight } from 'lucide-react';

interface PasswordHistoryProps {
  passwords: string[];
  onSelect: (password: string) => void;
}

function PasswordHistory({ passwords, onSelect }: PasswordHistoryProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <History className="text-slate-500 dark:text-slate-400 h-5 w-5" />
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200">Recent Passwords</h3>
      </div>
      
      <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
        {passwords.map((password, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(password)}
              className="w-full text-left py-2 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/30 rounded-lg text-sm font-mono truncate flex justify-between items-center group transition-colors"
            >
              <span className="truncate">{password}</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordHistory;