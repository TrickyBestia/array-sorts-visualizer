import { Grid, Paper, Typography, Box } from '@material-ui/core';
import React from 'react';
import ArrayProxyStep from '../../utils/ArrayProxyStep';

type Props = {
  steps: readonly ArrayProxyStep[];
  onSelectedStep: (step: ArrayProxyStep) => void;
};
export default function StepsViewer(props: Props): JSX.Element {
  const renderedSteps = props.steps
    .slice()
    .reverse()
    .map((step, index) => {
      return (
        <Grid item key={index}>
          <Paper
            onClick={() => props.onSelectedStep(step)}
            style={{ cursor: 'pointer' }}
          >
            <Box padding={1}>
              <Typography align="left">{step.description}</Typography>
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
}
