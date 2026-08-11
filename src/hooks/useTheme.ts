// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    return saved || 'auto';
  });
  const [appliedTheme, setAppliedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

    const updateAppliedTheme = () => {
      if (theme === 'auto') {
        setAppliedTheme(getSystemTheme());
      } else {
        setAppliedTheme(theme);
      }
    };

    updateAppliedTheme();

    const handleSystemChange = () => {
      if (theme === 'auto') {
        setAppliedTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appliedTheme);
  }, [appliedTheme]);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, appliedTheme, handleThemeChange };
};