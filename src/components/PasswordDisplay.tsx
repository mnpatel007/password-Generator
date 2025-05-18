import React from 'react';
import { Copy, Check } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  strength: number;
  copied: boolean;
  onCopy: () => void;
}

function PasswordDisplay({ password, strength, copied, onCopy }: PasswordDisplayProps) {
  // Get strength label and color based on strength score
  const getStrengthInfo = () => {
    if (strength >= 80) return { label: 'Very Strong', color: 'bg-green-500' };
    if (strength >= 60) return { label: 'Strong', color: 'bg-emerald-500' };
    if (strength >= 40) return { label: 'Medium', color: 'bg-yellow-500' };
    if (strength >= 20) return { label: 'Weak', color: 'bg-orange-500' };
    return { label: 'Very Weak', color: 'bg-red-500' };
  };

  const { label, color } = getStrengthInfo();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200">Your Password</h3>
        <button
          onClick={onCopy}
          className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors"
          disabled={copied}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 font-mono text-lg break-all mb-4 relative overflow-hidden group">
        <div 
          className={`absolute inset-0 bg-green-200/20 dark:bg-green-700/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${copied ? 'scale-x-100' : ''}`}
        ></div>
        <span className="relative z-10">{password}</span>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-500 dark:text-slate-400">Password Strength</span>
          <span className={`text-sm font-medium ${
            strength >= 60 ? 'text-green-600 dark:text-green-400' : 
            strength >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 
            'text-red-600 dark:text-red-400'
          }`}>
            {label}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-500 ease-out`} 
            style={{ width: `${strength}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default PasswordDisplay;