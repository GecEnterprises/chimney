import PanelContainer from '../components/PanelContainer'
import React, { useEffect, useRef } from 'react'
import { NodeEditor, GetSchemes, ClassicPreset } from 'rete'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin'
import { ReactPlugin, Presets, ReactArea2D } from 'rete-react-plugin'
import styled from 'styled-components'

type AreaExtra = ReactArea2D<Schemes>

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`

const TraversePanel: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) return

    let destroy: (() => void) | undefined

    async function initEditor() {
      const container = editorRef.current
      if (!container) return

      const { destroy: destroyEditor } = await createEditor(container)
      destroy = destroyEditor
    }

    initEditor()

    return () => {
      if (destroy) destroy()
    }
  }, [])

  return (
    <PanelContainer title="Traverse">
      <EditorContainer ref={editorRef} />
    </PanelContainer>
  )
}

async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket('socket')

  const editor = new NodeEditor<Schemes>()
  const area = new AreaPlugin<Schemes, AreaExtra>(container)
  const connection = new ConnectionPlugin<Schemes, AreaExtra>()
  const render = new ReactPlugin<Schemes, AreaExtra>()

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  })

  render.addPreset(Presets.classic.setup())

  connection.addPreset(ConnectionPresets.classic.setup())

  editor.use(area)
  area.use(connection)
  area.use(render)

  AreaExtensions.simpleNodesOrder(area)

  const a = new ClassicPreset.Node('A')
  a.addControl('a', new ClassicPreset.InputControl('text', { initial: 'a' }))
  a.addOutput('a', new ClassicPreset.Output(socket))
  await editor.addNode(a)

  const b = new ClassicPreset.Node('B')
  b.addControl('b', new ClassicPreset.InputControl('text', { initial: 'b' }))
  b.addInput('b', new ClassicPreset.Input(socket))
  await editor.addNode(b)

  await editor.addConnection(new ClassicPreset.Connection(a, 'a', b, 'b'))

  await area.translate(a.id, { x: 0, y: 0 })
  await area.translate(b.id, { x: 270, y: 0 })

  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes())
  }, 10)

  return {
    destroy: () => area.destroy(),
  }
}

export default TraversePanel
