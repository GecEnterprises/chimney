import { nanoid } from 'nanoid'
import { create } from 'zustand'

interface TraversePanelState {
  focus: number
}

interface TraversePanelStore {
  generateId: () => string

  mapped: Record<string, TraversePanelState>
}

export const useTraversePanelStore = create<TraversePanelStore>((set) => ({
  generateId: () => nanoid(),
  mapped: {},
}))
