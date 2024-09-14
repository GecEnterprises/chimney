import DebugConsolePanel from '../panels/DebugConsolePanel'
import TraversePanel from '../panels/TraversePanel'
import { atom } from 'jotai'

export const workingDirectoryAtom = atom<string | null>(null)

export enum Orientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type PanelItem = {
  orientation: Orientation
  panels: (JSX.Element | PanelItem)[]
}

export const panelsAtom = atom<PanelItem>({
  orientation: Orientation.Vertical,
  panels: [
    <TraversePanel />,
    {
      orientation: Orientation.Horizontal,
      panels: [<DebugConsolePanel />, <DebugConsolePanel />],
    },
    <TraversePanel />,
  ],
})
