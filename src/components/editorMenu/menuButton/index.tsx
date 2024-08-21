import styled from "@emotion/styled";
import { lightTheme } from "../../../themes/themes";
import { Button } from "@mui/material";

const MenuButton = styled(Button)`
    height: 100%;
    background: ${ lightTheme.textColor };
    border-radius: 0.2rem;
    border: none;
    color: ${ lightTheme.primaryColor };
    flex-align: right;
    &:hover {
        background: ${ lightTheme.secondaryColor };
    }
`

export default MenuButton