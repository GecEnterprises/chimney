import { atom } from "jotai";

export enum Orientation {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

export const orientationAtom = atom<Orientation>(Orientation.Vertical);
