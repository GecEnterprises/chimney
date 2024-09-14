import { Orientation } from './chimney'
import { atom } from 'jotai'

export const orientationAtom = atom<Orientation>(Orientation.Vertical)
