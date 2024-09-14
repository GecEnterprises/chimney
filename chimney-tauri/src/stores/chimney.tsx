import DebugConsolePanel from '../panels/DebugConsolePanel'
import ProjectPanel from '../panels/ProjectPanel'
import TraversePanel from '../panels/TraversePanel'
import { retry } from '@lifeomic/attempt'
import { readDir } from '@tauri-apps/plugin-fs'
import { Store } from '@tauri-apps/plugin-store'
import { create } from 'zustand'

export enum Orientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type PanelItem = {
  orientation: Orientation
  panels: ReadonlyArray<React.ReactElement | PanelItem>
}

export type FileTreeItem = {
  name: string
  type: 'file' | 'folder'
  children?: FileTreeItem[]
}

interface ChimneyState {
  workingDirectory: string | null
  orientation: Orientation
  panel: PanelItem

  fileTree: FileTreeItem[]
}

interface ChimneyStore extends ChimneyState {
  setWorkingDirectory: (dir: string | null) => void
  setOrientation: (orientation: Orientation) => void
  setPanel: (panel: PanelItem) => void

  refetchFileTree: () => void

  saveState: () => void
  loadState: () => void
}

const store = new Store('store.bin')

export const useChimneyStore = create<ChimneyStore>((set) => ({
  workingDirectory: null,
  orientation: Orientation.Horizontal,
  panel: {
    orientation: Orientation.Horizontal,
    panels: [
      <ProjectPanel />,
      {
        orientation: Orientation.Vertical,
        panels: [<TraversePanel />, <DebugConsolePanel />],
      },
    ],
  },
  fileTree: [],
  setWorkingDirectory: (dir) => set({ workingDirectory: dir }),
  setOrientation: (orientation) => set({ orientation }),
  setPanel: (panel) => set({ panel }),
  refetchFileTree: async () => {
    const { workingDirectory } = useChimneyStore.getState()

    if (workingDirectory) {
      const dir = await readDir(workingDirectory)

      console.log(dir)

      const fileTree = dir.map((item) => ({
        name: item.name,
        type: item.isDirectory ? 'folder' : 'file',
        children: [],
      })) as FileTreeItem[]

      set({ fileTree })
    } else {
      console.error('Working directory is not set')
    }
  },

  saveState: () => {
    const { workingDirectory, orientation } = useChimneyStore.getState()

    store.set('workingDirectory', workingDirectory)
    store.set('orientation', orientation)
  },
  loadState: async () => {
    const defaults = useChimneyStore.getState()

    const workingDirectory = (await store.get('workingDirectory')) as
      | string
      | null
      | undefined
    const orientation = (await store.get('orientation')) as
      | Orientation
      | null
      | undefined

    set({
      workingDirectory: workingDirectory ?? defaults.workingDirectory,
      orientation: orientation ?? defaults.orientation,
    })
  },
}))
