import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <main className="container mx-auto px-4 py-10">
          <PasswordGenerator />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;