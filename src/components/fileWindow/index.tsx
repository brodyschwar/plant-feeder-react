import React from 'react';
import styled from '@emotion/styled';
import { lightTheme } from '../../themes/themes';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    background: ${ lightTheme.secondaryColor };
`

const FileWindow = () => {
    return (
        <Wrapper>
            File Window
        </Wrapper>
    )
}

export default FileWindow