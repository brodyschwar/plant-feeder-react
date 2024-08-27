import React from 'react';
import Body from './components/body';
import styled from '@emotion/styled';
import NodeEditorContextProvider from './contexts/nodeEditorContext';
import ThemeProvider from './contexts/themeContext';
import FileMangerProvider from './contexts/fileManager';

const Group = styled.div`
    background: #EB8258;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

function App() {
  return (
    <Group>
      <ThemeProvider>
        <NodeEditorContextProvider>
          <FileMangerProvider>
            <Body/>
          </FileMangerProvider>
        </NodeEditorContextProvider>
      </ThemeProvider>
    </Group>
  );
}

export default App;
