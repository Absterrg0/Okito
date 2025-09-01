import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface EnvironmentStoreSchema{
  currentEnvironment: 'test' | 'live',
  toggleEnvironment: () => void;
}


const ENV_KEY = 'user-environment';
const DEFAULT_ENV = 'live';

export const useEnvironmentStore = create<EnvironmentStoreSchema>()(
  persist(
    (set) => ({
      currentEnvironment: DEFAULT_ENV,
      toggleEnvironment: () =>
        set((state) => ({
          currentEnvironment: state.currentEnvironment === 'live' ? 'test' : 'live',
        })),
    }),
    {
      name: ENV_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);