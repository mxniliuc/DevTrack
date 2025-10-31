import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<{ theme: string }>({ theme: 'light' });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
