
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import theme from './theme/theme.js';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  /* Non scrict mode */
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
