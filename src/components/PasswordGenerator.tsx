import React, { useState, useEffect } from 'react';
import { Copy, Check, MoonStar, Sun, RefreshCw, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import PasswordForm from './PasswordForm';
import PasswordDisplay from './PasswordDisplay';
import PasswordHistory from './PasswordHistory';
import { generatePassword, calculatePasswordStrength } from '../utils/passwordUtils';
import { PasswordOptions } from '../types';

function PasswordGenerator() {
  const { theme, toggleTheme } = useTheme();
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeDigits: true,
    includeSpecial: true
  });
  const [password, setPassword] = useState<string>('');
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password, passwordOptions));
    }
  }, [password, passwordOptions]);

  const handleOptionsChange = (newOptions: Partial<PasswordOptions>) => {
    setPasswordOptions(prev => ({ ...prev, ...newOptions }));
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordOptions);
    setPassword(newPassword);
    
    // Add to history if not already present
    if (!passwordHistory.includes(newPassword)) {
      setPasswordHistory(prev => [newPassword, ...prev].slice(0, 10));
    }
  };

  const handleCopyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectFromHistory = (selectedPassword: string) => {
    setPassword(selectedPassword);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-400 flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Password Generator
        </h1>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <MoonStar size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300">
        <PasswordForm 
          options={passwordOptions}
          onOptionsChange={handleOptionsChange}
          onGenerate={handleGeneratePassword}
        />
      </div>

      {password && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300">
          <PasswordDisplay 
            password={password}
            strength={passwordStrength}
            copied={copied}
            onCopy={handleCopyToClipboard}
          />
        </div>
      )}

      {passwordHistory.length > 0 && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 transition-all duration-300">
          <PasswordHistory 
            passwords={passwordHistory}
            onSelect={handleSelectFromHistory}
          />
        </div>
      )}

      <button
        onClick={handleGeneratePassword}
        className="mt-6 w-full py-3 px-6 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
      >
        <RefreshCw className={password ? "h-5 w-5" : "h-5 w-5 animate-spin"} />
        {password ? "Generate New Password" : "Generate Password"}
      </button>

      {password && (
        <button
          onClick={handleCopyToClipboard}
          className="mt-4 w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              Copy to Clipboard
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default PasswordGenerator;