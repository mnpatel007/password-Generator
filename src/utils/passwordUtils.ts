import { PasswordOptions } from '../types';

export function generatePassword(options: PasswordOptions): string {
  const { length, includeUppercase, includeDigits, includeSpecial } = options;
  
  // Define character sets
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digitChars = '0123456789';
  const specialChars = '@#$!%*&_-+';
  
  // Build the character pool based on options
  let charPool = lowercaseChars;
  if (includeUppercase) charPool += uppercaseChars;
  if (includeDigits) charPool += digitChars;
  if (includeSpecial) charPool += specialChars;
  
  // Generate the password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
  
  // Ensure the password contains at least one character from each selected category
  const requiredChars = [];
  
  if (includeUppercase) {
    requiredChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
  }
  
  if (includeDigits) {
    requiredChars.push(digitChars[Math.floor(Math.random() * digitChars.length)]);
  }
  
  if (includeSpecial) {
    requiredChars.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
  }
  
  // Replace characters at random positions with required characters
  for (let i = 0; i < requiredChars.length; i++) {
    const position = Math.floor(Math.random() * length);
    password = password.substring(0, position) + requiredChars[i] + password.substring(position + 1);
  }
  
  return password;
}

export function calculatePasswordStrength(password: string, options: PasswordOptions): number {
  if (!password) return 0;
  
  let score = 0;
  
  // Length contribution (up to 40 points)
  score += Math.min(40, password.length * 2);
  
  // Character variety contribution (up to 60 points)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSpecial = /[@#$!%*&_\-+]/.test(password);
  
  if (hasLowercase) score += 10;
  if (hasUppercase) score += 15;
  if (hasDigits) score += 15;
  if (hasSpecial) score += 20;
  
  // Penalty for not using selected options
  if (options.includeUppercase && !hasUppercase) score -= 15;
  if (options.includeDigits && !hasDigits) score -= 15;
  if (options.includeSpecial && !hasSpecial) score -= 20;
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
}