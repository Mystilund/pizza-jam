import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app';
import { GameProvider } from './contexts/game-context';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import { CDN_URL } from './utils/constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Pacifico&display=swap"
      rel="stylesheet"
    />
    <ChakraProvider theme={theme}>
      <Global
        styles={[
          {
            '@font-face': {
              fontFamily: 'AlarmClock',
              src: `url('${CDN_URL}/fonts/alarm-clock.ttf')`,
            },
            body: {
              background: 'black',
              fontFamily: "'Lato', 'Arial', 'sans-serif'",
            },
          },
          {
            '@font-face': {
              fontFamily: 'ActionComics',
              src: `url('${CDN_URL}/fonts/action-comics.ttf')`,
            },
          },
        ]}
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
