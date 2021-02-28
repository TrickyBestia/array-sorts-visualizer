import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import '@fontsource/roboto';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#263238' },
    secondary: {
      main: '#455a64',
    },
  },
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
