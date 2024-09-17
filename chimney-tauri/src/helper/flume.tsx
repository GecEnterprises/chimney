import { renderFilepathFlume } from './flumeCompnents'
import { DefVersion, ChimneyDefs } from 'chimney-defs'
import { Controls, FlumeConfig } from 'flume'

const config = new FlumeConfig()

const def = ChimneyDefs[DefVersion.V1]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }

  // Add more randomness by XORing and shifting bits
  hash = (hash ^ (hash >>> 16)) * 0x45d9f3b
  hash = (hash ^ (hash >>> 16)) * 0x45d9f3b
  hash = hash ^ (hash >>> 16)

  return hash
}

function colorFromString(str: string): string {
  const hash = Math.abs(hashString(str))

  // Expanded color array for more variety
  const colorArray = [
    'yellow',
    'orange',
    'red',
    'pink',
    'purple',
    'blue',
    'green',
    'grey',
  ]

  return colorArray[hash % colorArray.length]
}

function getControl(str: string) {
  switch (str) {
    case 'string':
      return Controls.text({})
    case 'number':
      return Controls.number({})
    case 'filepath':
      return Controls.custom({
        name: str,
        label: str,
        render: renderFilepathFlume,
      })
    default:
      return Controls.text({})
  }
}

def.ports.forEach((port) => {
  console.log(port)

  config.addPortType({
    type: port.id,
    name: port.id,
    label: port.label,
    //@ts-ignore
    color: colorFromString(port.id),
    //@ts-ignore
    controls: [getControl(port.type)],
  })
})

def.nodes.forEach((node) => {
  config.addNodeType({
    type: node.id,
    description: node.description,
    label: node.label,
    inputs: (ports) => {
      let inputs = node.inputs.map((input) =>
        ports[input.type]({
          name: input.name,
          label: input.label,
        })
      )

      return inputs
    },
    outputs: (ports) => {
      let outputs = node.outputs.map((output) =>
        ports[output.type]({
          name: output.name,
          label: output.label,
        })
      )

      return outputs
    },
  })
})

export default config
