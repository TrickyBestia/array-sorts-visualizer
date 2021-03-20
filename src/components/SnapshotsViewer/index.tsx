import { Grid, Paper, Typography, Box, useTheme } from '@material-ui/core';
import React from 'react';
import ArrayProxySnapshot from '../../utils/ArrayProxySnapshot';

type Props = {
  snapshots: readonly ArrayProxySnapshot[];
  onSelectedSnapshot?: (step: ArrayProxySnapshot) => void;
};

const SnapshotsViewer = (props: Props): JSX.Element => {
  const theme = useTheme();
  const renderedSteps = props.snapshots
    .slice()
    .reverse()
    .map((step, index) => {
      return (
        <Grid item key={index}>
          <Paper
            onClick={() => props.onSelectedSnapshot?.(step)}
            style={{
              cursor: 'pointer',
              backgroundColor: theme.palette.primary.light,
            }}
          >
            <Box padding={1}>
              <Typography
                align="left"
                style={{ color: theme.palette.primary.contrastText }}
              >
                {step.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      );
    });
  return (
    <Grid container direction="column" spacing={1}>
      {renderedSteps}
    </Grid>
  );
};

export default SnapshotsViewer;
