import React from 'react';
import Body from './components/body';
import Header from './components/header';
import styled from '@emotion/styled';
import NodeEditorContextProvider from './contexts/nodeEditorContext';

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
      <NodeEditorContextProvider>
        <Body/>
      </NodeEditorContextProvider>
    </Group>
  );
}

export default App;
