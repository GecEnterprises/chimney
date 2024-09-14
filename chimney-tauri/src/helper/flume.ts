import { Colors, Controls, FlumeConfig } from 'flume'

const config = new FlumeConfig()
config.addPortType({
  type: 'string',
  name: 'string',
  label: 'Text',
  color: Colors.green,
  controls: [
    Controls.text({
      name: 'string',
      label: 'Text',
    }),
  ],
})

config.addPortType({
  type: 'boolean',
  name: 'boolean',
  label: 'Boolean',
  color: Colors.blue,
  controls: [
    Controls.checkbox({
      name: 'boolean',
    }),
  ],
})

config.addRootNodeType({
  type: 'addon',
  label: 'Add-On',
  initialWidth: 170,
  inputs: (ports) => [
    ports.string({
      name: 'title',
      label: 'Title',
    }),
    ports.string({
      name: 'description',
      label: 'Description',
    }),

    ports.boolean({
      name: 'showSignup',
      label: 'Show Signup',
    }),
  ],
})

config.addNodeType({
  type: 'user',
  label: 'User',
  description: 'Outputs attributes of the current user',
  initialWidth: 130,
  outputs: (ports) => [
    ports.string({
      name: 'firstName',
      label: 'First Name',
    }),
    ports.string({
      name: 'lastName',
      label: 'Last Name',
    }),
    ports.boolean({
      name: 'isLoggedIn',
      label: 'Is Logged-In',
    }),
  ],
})

export default config
