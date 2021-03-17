import Header from '../Header';
import Content from '../Content';
import { CSSProperties } from 'react';
import { Box, useTheme } from '@material-ui/core';
import React from 'react';

const App = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      style={{
        ...styles.app,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Header />
      <Box style={styles.content}>
        <Content />
      </Box>
    </Box>
  );
};

const styles: { app: CSSProperties; content: CSSProperties } = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  content: {
    width: 'auto',
    margin: '2%',
    height: '85%',
    flexGrow: 1,
  },
};

export default App;
