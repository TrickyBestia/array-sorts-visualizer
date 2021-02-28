import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import githubLogo from './githubLogo.png';

type Props = {
  style?: React.HTMLAttributes<'header'>;
};
export default function Header(props: Props): JSX.Element {
  return (
    <header style={props.style}>
      <AppBar
        position="relative"
        style={{ backgroundColor: useTheme().palette.primary.dark }}
      >
        <Container fixed>
          <Toolbar>
            <Typography variant="h5">array-sorts-visualizer</Typography>
            <Button
              rel="noreferrer"
              target="_blank"
              href="https://github.com/TrickyBestia/array-sorts-visualizer"
              style={{ marginLeft: 'auto' }}
            >
              <img
                src={githubLogo}
                style={{
                  objectFit: 'fill',
                }}
              />
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
