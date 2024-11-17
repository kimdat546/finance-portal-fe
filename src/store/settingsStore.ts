import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useSettingsStore = create(
    persist<SettingsState>(
        (set) => ({
            theme: 'light',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
