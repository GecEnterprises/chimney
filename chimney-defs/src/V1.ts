import { DefVersion } from "./DefVersion";
import type { ChimneyDef } from "./root";

export const DefVersionV1: ChimneyDef = {
  version: DefVersion.V1,
  ports: [
    {
      id: "string",
      typeTs: "string",
      type: "string",
      label: "String",
    },
  ],
  nodes: [
    {
      id: "entity",
      type: "entity",
      label: "Entity",
      description: "An entity",
      inputs: [],
      outputs: [
        {
          id: "string",
          type: "string",
          name: "entity",
          label: "whole entity",
        },
      ],
    },

    {
      id: "addon",
      type: "addon",
      label: "Add-On",
      description: "The end of everything",
      inputs: [
        {
          id: "string",
          type: "string",
          name: "entities",
          label: "all entities",
        },
      ],
      outputs: [],
    },
  ],
};
