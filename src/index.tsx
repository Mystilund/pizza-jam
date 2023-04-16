import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import { GameProvider } from './contexts/game-context';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Global
        styles={{
          body: {
            background: 'black',
          },
        }}
      />
      <GameProvider>
        <App />
      </GameProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
