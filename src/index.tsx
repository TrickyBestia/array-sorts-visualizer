import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import '@fontsource/roboto';
import './style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#162228',
      light: '#2f3b42',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffab00',
      light: '#ffdd4b',
      dark: '#c67c00',
      contrastText: '#000000',
    },
  },
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
