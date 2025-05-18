import React from 'react';
import { PasswordOptions } from '../types';

interface PasswordFormProps {
  options: PasswordOptions;
  onOptionsChange: (options: Partial<PasswordOptions>) => void;
  onGenerate: () => void;
}

function PasswordForm({ options, onOptionsChange, onGenerate }: PasswordFormProps) {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(e.target.value);
    if (!isNaN(length)) {
      onOptionsChange({ length });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onOptionsChange({ [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label 
          htmlFor="length" 
          className="block text-slate-700 dark:text-slate-200 font-medium mb-2"
        >
          Password Length: {options.length}
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">8</span>
          <input
            type="range"
            id="length"
            name="length"
            min="8"
            max="32"
            value={options.length}
            onChange={handleLengthChange}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <span className="text-sm text-slate-500 dark:text-slate-400">32</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="includeUppercase"
            checked={options.includeUppercase}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-violet-600 rounded border-slate-300 dark:border-slate-600 focus:ring-violet-500"
          />
          <span className="text-slate-700 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
            Include Uppercase Letters (A-Z)
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="includeDigits"
            checked={options.includeDigits}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-violet-600 rounded border-slate-300 dark:border-slate-600 focus:ring-violet-500"
          />
          <span className="text-slate-700 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
            Include Digits (0-9)
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="includeSpecial"
            checked={options.includeSpecial}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-violet-600 rounded border-slate-300 dark:border-slate-600 focus:ring-violet-500"
          />
          <span className="text-slate-700 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
            Include Special Characters (@#$!%*&_-+)
          </span>
        </label>
      </div>
    </form>
  );
}

export default PasswordForm;