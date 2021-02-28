import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  value: number;
  maxValue: number;
  index: number;
  indexColor: string;
  canMoveRight: boolean;
  canMoveLeft: boolean;
  onMoveRight: (index: number) => void;
  onMoveLeft: (index: number) => void;
  onDelete: (index: number) => void;
};
export default function ArrayProxyStepViewerItem(props: Props): JSX.Element {
  const [isDeletionTooltipShowed, setDeletionTooltipShowed] = useState(false);
  return (
    <Grid
      container
      item
      style={{ width: 'auto', flexGrow: 1 }}
      direction="column"
    >
      <Box padding={1} style={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          justify="flex-end"
          style={{ height: '100%' }}
        >
          <Grid
            item
            style={{
              height: ((props.value * 100) / props.maxValue).toString() + '%',
            }}
          >
            <Paper
              style={{
                height: '100%',
              }}
            >
              <Typography align="center">{props.value}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box padding={1}>
        <Paper style={{ backgroundColor: props.indexColor }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            wrap="nowrap"
            spacing={1}
          >
            <Grid item>
              <Button
                disabled={!props.canMoveLeft}
                style={{ minWidth: 0 }}
                onClick={() => props.onMoveLeft(props.index)}
              >
                {'<'}
              </Button>
            </Grid>
            <Grid item>
              <Box
                onMouseEnter={() => setDeletionTooltipShowed(true)}
                onMouseLeave={() => setDeletionTooltipShowed(false)}
              >
                {isDeletionTooltipShowed ? (
                  <Button onClick={() => props.onDelete(props.index)}>
                    delete
                  </Button>
                ) : (
                  <Typography align="center">{props.index}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item>
              <Button
                disabled={!props.canMoveRight}
                style={{ minWidth: 0 }}
                onClick={() => props.onMoveRight(props.index)}
              >
                {'>'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
