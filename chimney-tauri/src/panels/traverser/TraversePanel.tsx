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
  const handleCenterFocus = () => {}

  return (
    <PanelContainer title="Traverse">
      <EditorContainer>
        <NodeEditor
          portTypes={config.portTypes}
          nodeTypes={config.nodeTypes}
          defaultNodes={[
            {
              type: 'addon',
              x: 190,
              y: -150,
            },
          ]}
        />
        <Toolbox onCenterFocus={handleCenterFocus} />
      </EditorContainer>
    </PanelContainer>
  )
}

export default TraversePanel
