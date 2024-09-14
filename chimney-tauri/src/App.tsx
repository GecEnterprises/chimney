import { theme } from './Theme'
import Header from './components/Header'
import { Orientation, PanelItem, useChimneyStore } from './stores/chimney'
import { logDebugAtom } from './stores/logger'
import { useEffect, useState } from 'react'
import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root, .App {
    background-color: ${({ theme }) => theme.colors.background};
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .panel-resize-handle-horizontal {
    cursor: col-resize;
    background-color: ${({ theme }) => theme.colors.borderSecondary};
    width: 2px;
    transition: background-color 0.3s ease;
  }

  .panel-resize-handle-horizontal:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .panel-resize-handle-horizontal:active {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: ew-resize;
  }

  .panel-resize-handle-horizontal:focus {
    outline: none;
    box-shadow: none;
  }

  .panel-resize-handle-vertical {
    cursor: row-resize;
    background-color: ${({ theme }) => theme.colors.borderSecondary};
    height: 2px;
    transition: background-color 0.3s ease;
  }

  .panel-resize-handle-vertical:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .panel-resize-handle-vertical:active {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: ns-resize;
  }

  .panel-resize-handle-vertical:focus {
    outline: none;
    box-shadow: none;
  }
`

const AppContainer = styled.div`
  height: 100%;
`

const PanelGroupStyling = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
`

function App() {
  const [currentTheme] = useState<'light' | 'dark'>('dark')
  const loadState = useChimneyStore((e) => e.loadState)

  useEffect(() => {
    loadState()
  }, [])

  const renderPanels = (structure: PanelItem) => (
    <>
      <PanelGroup direction={structure.orientation}>
        {structure.panels.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <PanelResizeHandle
                className={`panel-resize-handle panel-resize-handle-${structure.orientation === Orientation.Vertical ? 'vertical' : 'horizontal'}`}
              />
            )}
            <Panel minSize={10}>
              {React.isValidElement(item)
                ? item
                : renderPanels(item as PanelItem)}
            </Panel>
          </React.Fragment>
        ))}
      </PanelGroup>
    </>
  )

  const panel = useChimneyStore((state) => state.panel)

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <PanelGroupStyling>{renderPanels(panel)}</PanelGroupStyling>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
