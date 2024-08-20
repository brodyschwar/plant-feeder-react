import React from 'react';
import Body from './components/body';
import Header from './components/header';
import styled from '@emotion/styled'

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
