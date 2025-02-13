import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Hook personalizado para manejar el tema oscuro
export default function useDarkMode() {
    const theme = useSelector((state) => state.themeConfig.theme); // 'light' | 'dark' | 'system'
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const applySystemTheme = () => {
            if (theme === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDarkMode(prefersDark);
            } else {
                setIsDarkMode(theme === 'dark');
            }
        };

        applySystemTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', applySystemTheme);

        return () => mediaQuery.removeEventListener('change', applySystemTheme);
    }, [theme]);

    return isDarkMode;
}
