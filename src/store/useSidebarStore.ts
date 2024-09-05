import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  closeSidebar: () => set(() => ({ isOpen: false })),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
