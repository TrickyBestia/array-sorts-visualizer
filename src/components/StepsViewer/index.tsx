import { Grid, Paper, Typography, Box, useTheme } from '@material-ui/core';
import React from 'react';
import ArrayProxyStep from '../../utils/ArrayProxyStep';

type Props = {
  steps: readonly ArrayProxyStep[];
  onSelectedStep: (step: ArrayProxyStep) => void;
};
export default function StepsViewer(props: Props): JSX.Element {
  const theme = useTheme();
  const renderedSteps = props.steps
    .slice()
    .reverse()
    .map((step, index) => {
      return (
        <Grid item key={index}>
          <Paper
            onClick={() => props.onSelectedStep(step)}
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
}
