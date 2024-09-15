import { DefVersion } from "./DefVersion";
import { DefVersionV1 } from "./V1";

export type PortTypeName = string;

export interface PortType {
  id: string;
  type: PortTypeName;
  label: string;
}

export interface NodePort {
  id: string;
  type: PortTypeName;
  name: string;
  label: string;
}

export interface Node {
  id: string;
  description: string;
  type: string;
  label: string;
  inputs: NodePort[];
  outputs: NodePort[];
}

export interface ChimneyDef {
  version: string;

  ports: PortType[];
  nodes: Node[];
}

export const ChimneyDefs: Record<DefVersion, ChimneyDef> = {
  [DefVersion.V1]: DefVersionV1,
};
