import { create } from 'zustand'

interface SidebarState {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  close: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
  close: () => set({ open: false }),
}))
