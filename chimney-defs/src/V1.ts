import { DefVersion } from "./DefVersion";
import type { ChimneyDef } from "./root";

// ChimneyNodePortHybrid means that
// the node itself is a data type
// and it creates one single output named "Out" with the type being
// the node name itself
export interface ChimneyNodePortHybrid {}

export interface ChimneyNode {}

export interface ChimneyTextureReference extends ChimneyNodePortHybrid {
  path: string;
}

export interface ChimneyBlockTexture extends ChimneyNodePortHybrid {
  up: ChimneyTextureReference;
  down: ChimneyTextureReference;
  north: ChimneyTextureReference;
  south: ChimneyTextureReference;
  east: ChimneyTextureReference;
  west: ChimneyTextureReference;
}

export interface ChimneyBlock extends ChimneyNode {
  identifier: string;
  texture: ChimneyBlockTexture;
}

export const DefVersionV1: ChimneyDef = {
  version: "1.0",
  ports: [
    {
      id: "chimneytexturereference",
      type: "chimneytexturereference",
      label: "chimneytexturereference",
    },
    {
      id: "string",
      type: "string",
      label: "String",
    },
    {
      id: "chimneyblock",
      type: "chimneyblock",
      label: "Chimney Block",
    },
    {
      id: "chimneyblocktexture",
      type: "chimneyblocktexture",
      label: "chimneyblocktexture",
    },
  ],
  nodes: [
    {
      id: "chimneytexturereference",
      description: "A chimney texture reference",
      type: "chimneytexturereference",
      label: "Chimney Texture Reference",
      inputs: [
        {
          id: "path",
          type: "string",
          name: "path",
          label: "Path",
        },
      ],
      outputs: [
        {
          id: "chimneytexturereference",
          type: "chimneytexturereference",
          name: "chimneytexturereference",
          label: "Chimney Texture Reference",
        },
      ],
    },
    {
      id: "chimneyblocktexture",
      description: "A chimney block texture",
      type: "chimneyblocktexture",
      label: "Chimney Block Texture",
      inputs: [
        {
          id: "up",
          type: "chimneytexturereference",
          name: "up",
          label: "Up",
        },
        {
          id: "down",
          type: "chimneytexturereference",
          name: "down",
          label: "Down",
        },
        {
          id: "north",
          type: "chimneytexturereference",
          name: "north",
          label: "North",
        },
        {
          id: "south",
          type: "chimneytexturereference",
          name: "south",
          label: "South",
        },
        {
          id: "east",
          type: "chimneytexturereference",
          name: "east",
          label: "East",
        },
        {
          id: "west",
          type: "chimneytexturereference",
          name: "west",
          label: "West",
        },
      ],
      outputs: [
        {
          id: "chimneyblocktexture",
          type: "chimneyblocktexture",
          name: "chimneyblocktexture",
          label: "Chimney Block Texture",
        },
      ],
    },
    {
      id: "chimneyblock",
      description: "A chimney block",
      type: "chimneyblock",
      label: "Chimney Block",
      inputs: [
        {
          id: "identifier",
          type: "string",
          name: "identifier",
          label: "Identifier",
        },
        {
          id: "texture",
          type: "chimneyblocktexture",
          name: "texture",
          label: "Texture",
        },
      ],
      outputs: [],
    },
  ],
};

// export const DefVersionV1: ChimneyDef = {
//   version: DefVersion.V1,
//   ports: [
//     {
//       id: "string",
//       type: "string",
//       label: "String",
//     },
//     {
//       id: "custom",
//       type: "custom",
//       label: "Custom",
//     },
//   ],
//   nodes: [
//     {
//       id: "entity",
//       type: "entity",
//       label: "Entity",
//       description: "An entity",
//       inputs: [],
//       outputs: [
//         {
//           id: "custom",
//           type: "custom",
//           name: "components",
//           label: "Components",
//         },
//         {
//           id: "string",
//           type: "string",
//           name: "entity",
//           label: "whole entity",
//         },
//       ],
//     },

//     {
//       id: "addon",
//       type: "addon",
//       label: "Add-On",
//       description: "The end of everything",
//       inputs: [
//         {
//           id: "string",
//           type: "string",
//           name: "entities",
//           label: "all entities",
//         },
//       ],
//       outputs: [],
//     },
//   ],
// };
