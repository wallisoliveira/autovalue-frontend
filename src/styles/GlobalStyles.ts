// src/styles/GlobalStyles.ts

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset Básico para consistência */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Aplica o fundo preto e o texto branco no container principal do React */
  #root {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    min-height: 100vh;
  }

  /* Definição de fontes */
  body {
    font-family: 'Roboto', sans-serif; /* Usaremos Roboto como fonte limpa */
  }

  /* Estilos para links, mantendo a paleta B&W */
  a {
    color: var(--color-white);
    text-decoration: none;

    &:hover {
      color: #999999; /* Cinza claro no hover */
    }
  }

  /* Estilizando o scrollbar para o tema escuro */
  ::-webkit-scrollbar {
    width: 8px;
    background: var(--color-black); 
  }

  ::-webkit-scrollbar-thumb {
    background: #222; /* Cinza escuro */
    border-radius: 4px;
  }
`;

export default GlobalStyle;