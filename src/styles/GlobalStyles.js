import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:boerder-box;
    }
    body{
        // 폰트 스타일 적용
        /* font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
        
        // 기본 폰트 사이즈
        font-size: 14px;
        
        // 기본 폰트 컬러 
        // color: ${props => props.theme.color.blue}
    }
`;

export default GlobalStyles;
