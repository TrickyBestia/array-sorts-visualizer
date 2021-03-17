import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import CSS from 'csstype';
import githubLogo from './githubLogo.png';

const Header = (): JSX.Element => {
  const theme = useTheme();

  return (
    <header>
      <AppBar
        position="relative"
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <Container fixed>
          <Toolbar>
            <Typography variant="h5">array-sorts-visualizer</Typography>
            <Button
              rel="noreferrer"
              target="_blank"
              href="https://github.com/TrickyBestia/array-sorts-visualizer"
              style={styles.githubButton}
            >
              <img src={githubLogo} style={styles.githubLogo} />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

const styles: {
  githubButton: CSS.Properties;
  githubLogo: CSS.Properties;
} = {
  githubButton: {
    marginLeft: 'auto',
  },
  githubLogo: {
    objectFit: 'fill',
  },
};

export default Header;
