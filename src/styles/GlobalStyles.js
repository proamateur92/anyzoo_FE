import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
    ${reset};
    html {
        font-size: min(2.67vw, 14px);
    }
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    body{
        font-family: 'Roboto', sans-serif;
    }
    textarea {
        resize: none;
        font-family: 'Roboto', sans-serif;
    }
    input {
        outline: none;
        border: none;
    }
    button {
        cursor: pointer;
        outline: none;
        border: none;
    }
`;

export default GlobalStyles;
