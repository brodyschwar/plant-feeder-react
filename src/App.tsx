import React from 'react';
import EditorWindow from './components/editorWindow';
import Body from './components/body';
import Header from './components/header';
import styled from 'styled-components';

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
      <Header></Header>
      <Body></Body>
    </Group>
  );
}

export default App;
