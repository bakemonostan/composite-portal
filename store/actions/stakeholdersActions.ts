import {create} from 'zustand';
import { createStakeholder, getAllStakeholders, getStakeholderById, updateStakeholder, deleteStakeholder } from '../../api/stakeholdersRequests';

export interface StakeholderStoreState {
  items: object[];
  selectedItem: object | null;
  error: string | null;
}

// Define the type for your actions
export interface StakeholderStoreActions {
  setItems: (items: any) => void;
  setSelectedItem: (selectedItem: any) => void;
  setError: (error: any) => void;
  createStakeholder: (data: any) => void;
  getAllStakeholders: () => void;
  getStakeholderById: (id: number) => void;
  updateStakeholder: (id: number, data: any) => void;
}

// Define the type for your store combining state and actions
export type StakeholderStore = StakeholderStoreState & StakeholderStoreActions;

const useStore = create<StakeholderStore>((set) => ({
  items: [],
  selectedItem: null,
  error: null,

  setItems: (items: any) => set({ items }),
  setSelectedItem: (selectedItem: any) => set({ selectedItem }),
  setError: (error: any) => set({ error }),

  createStakeholder: async (data: any) => {
    try {
      const newItem = await createStakeholder(data);
      set((state: any) => ({ items: [...state.items, newItem] }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getAllStakeholders: async () => {
    try {
      const items = await getAllStakeholders();
      set({ items });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getStakeholderById: async (id: number) => {
    try {
      const item = await getStakeholderById(id);
      set({ selectedItem: item.data });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  updateStakeholder: async (id: number, data?: any) => {
    try {
      const updatedItem = await updateStakeholder(id, data);
      set((state: any) => ({
        items: state.items.map((item: any) =>
          item.id === id ? updatedItem : item
        ),
        selectedItem:
          updatedItem.id === state.selectedItem?.id
            ? updatedItem
            : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  deleteStakeholder: async (id: number) => {
    try {
      await deleteStakeholder(id);
      set((state: any) => ({
        items: state.items.filter((item: any) => item.id !== id),
        selectedItem:
          state.selectedItem && state.selectedItem.id === id
            ? null
            : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },
}));

export default useStore;
