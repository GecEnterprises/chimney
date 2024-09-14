import { DefVersion, ChimneyDefs } from 'chimney-defs'
import { Colors, Controls, FlumeConfig } from 'flume'

const config = new FlumeConfig()

const def = ChimneyDefs[DefVersion.V1]

def.ports.forEach((port) => {
  config.addPortType({
    type: port.id,
    name: port.id,
    label: port.label,
    color: Colors.green,
    controls:
      port.typeTs == 'string' ? [Controls.text({})] : [Controls.number({})],
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
