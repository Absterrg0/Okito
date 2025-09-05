import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define the shape of the project object stored in the state
export interface SelectedProject {
    id: string;
    name: string;
}

// Define the shape of the entire store, including state and actions
interface SelectedProjectStore {
    selectedProject: SelectedProject | null;
    setSelectedProject: (project: SelectedProject) => void;
    clearSelectedProject: () => void;
}

export const useSelectedProjectStore = create<SelectedProjectStore>()(
    persist(
        (set) => ({
            // Initial state: no project is selected
            selectedProject: null,
            
            // Action to set the selected project
            setSelectedProject: (project) => set({ selectedProject: project }),

            // Action to clear the selected project
            clearSelectedProject: () => set({ selectedProject: null }),
        }),
        {
            name: 'selected-project-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage), // use localStorage
        }
    )
);
