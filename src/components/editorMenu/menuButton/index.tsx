import styled from "@emotion/styled";
import { darkTheme } from "../../../themes/themes";
import { Button } from "@mui/material";

const MenuButton = styled(Button)`
    height: 100%;
    background: ${ darkTheme.baseColor };
    border-radius: 0.2rem;
    border: none;
    color: ${ darkTheme.primaryColor };
    flex-align: right;
    &:hover {
        background: ${ darkTheme.secondaryColor };
    }
`

export default MenuButton