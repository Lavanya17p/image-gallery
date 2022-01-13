import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #192232;
        font-size: 1.2rem;
        font-family: 'Nunito', sans-serif;
        ::-webkit-scrollbar{
            width: 8px;
        }
        ::-webkit-scrollbar-track{
           background: #4f6877;
        }
        ::-webkit-scrollbar-thumb{
            background: linear-gradient(179.67deg,  #0b7ba5 -12.17%, #00182e 67.09%);
            border-radius: 24px;
        }
    }

    .logo{
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: 3.5rem;
        padding-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
      color: white;
      font-size: 1.5rem;
      font-family: 'Roboto', sans-serif;
      text-align: center;
    }

    input::placeholder{
        color: rgb(5 64 96);
    }

    input, a, button{
        font-size: inherit;
        font-family: inherit;
    }

    .header form .input-control:focus-within{
        width: 100%;
    }

`;

export default GlobalStyles;
