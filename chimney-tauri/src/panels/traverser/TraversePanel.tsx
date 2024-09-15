import PanelContainer from '../../components/PanelContainer'
import config from '../../helper/flume'
import Toolbox from './Toolbox'
import { NodeEditor } from 'flume'
import React from 'react'
import styled from 'styled-components'

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const TraversePanel: React.FC = () => {
  const nodeEditor = React.useRef()

  const saveNodes = () => {
    //@ts-ignore
    const nodes = nodeEditor.current.getNodes()
    // Do whatever you want with the nodes

    console.log(nodes)
  }

  return (
    <PanelContainer title="Traverse">
      <EditorContainer>
        <NodeEditor
          ref={nodeEditor}
          portTypes={config.portTypes}
          nodeTypes={config.nodeTypes}
        />
        <Toolbox onCenterFocus={saveNodes} />
      </EditorContainer>
    </PanelContainer>
  )
}

export default TraversePanel
