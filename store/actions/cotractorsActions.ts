import {create} from 'zustand';
import { createContractor, getAllContractors, getContractorById, updateContractor, deleteContractor } from '../../api/contractorsRequests';

const useStore = create((set) => ({
  items: [],
  selectedItem: null,
  error: null,

  setItems: (items: any) => set({ items }),
  setSelectedItem: (selectedItem: any) => set({ selectedItem }),
  setError: (error: any) => set({ error }),

  createContractor: async (data: any) => {
    try {
      const newItem = await createContractor(data);
      set((state: any) => ({ items: [...state.items, newItem] }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getAllContractors: async () => {
    try {
      const items = await getAllContractors();
      set({ items });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getContractorById: async (id: number) => {
    try {
      const item = await getContractorById(id);
      set({ selectedItem: item });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  updateContractor: async (id: number, data: any) => {
    try {
      const updatedItem = await updateContractor(id, data);
      set((state: any) => ({
        items: state.items.map((item: any) => (item.id === id ? updatedItem : item)),
        selectedItem: updatedItem.id === state.selectedItem?.id ? updatedItem : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  deleteContractor: async (id: number) => {
    try {
      await deleteContractor(id);
      set((state: any) => ({
        items: state.items.filter((item: any) => item.id !== id),
        selectedItem: state.selectedItem && state.selectedItem.id === id ? null : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },
}));

export default useStore;
