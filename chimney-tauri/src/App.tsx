import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Header from './components/Header';
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components';
import { useState } from 'react';
import { theme } from './Theme';
import PanelContainer from './components/PanelContainer';
import DebugConsolePanel from './panels/DebugConsolePanel';
import TraversePanel from './panels/TraversePanel';

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

  .panel-resize-handle {
    cursor: col-resize;
    background-color: ${({ theme }) => theme.colors.borderSecondary};
    width: 2px;
    transition: background-color 0.3s ease;
  }

  .panel-resize-handle:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .panel-resize-handle:active {
    background-color: ${({ theme }) => theme.colors.primary};
    cursor: ew-resize;
  }

  .panel-resize-handle:focus {
    outline: none;
    box-shadow: none;
  }
`;

const AppContainer = styled.div`
  height: 100%;
`;

const PanelGroupStyling = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
`;

const PanelContent = styled.div`
  height: 100%;
`;

function App() {
  const [currentTheme,] = useState<'light' | 'dark'>('dark');

  return (  
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <PanelGroupStyling>
          <PanelGroup direction="horizontal" >
            <Panel minSize={20}>
              <TraversePanel />
            </Panel>
            <PanelResizeHandle className='panel-resize-handle' />
            <Panel minSize={20}>
              <DebugConsolePanel />
            </Panel>
          </PanelGroup>
        </PanelGroupStyling>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
