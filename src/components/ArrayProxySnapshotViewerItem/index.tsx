import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';

type Props = {
  value: number;
  maxValue: number;
  index: number;
  indexColor: string;
  canMoveRight: boolean;
  canMoveLeft: boolean;
  onMoveRight: () => void;
  onMoveLeft: () => void;
  onDelete: () => void;
};

const ArrayProxySnapshotViewerItem = (props: Props): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

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
                backgroundColor: useTheme().palette.secondary.main,
              }}
            >
              <Typography align="center">{props.value}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box
        padding={1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
                style={{ minWidth: 0, width: 0 }}
                onClick={props.onMoveLeft}
              >
                {'<'}
              </Button>
            </Grid>
            <Grid item>
              {isHovered ? (
                <IconButton
                  style={{ padding: 0 }}
                  onClick={props.onDelete}
                  size="small"
                >
                  <Delete />
                </IconButton>
              ) : (
                <Typography align="center">{props.index}</Typography>
              )}
            </Grid>
            <Grid item>
              <Button
                disabled={!props.canMoveRight}
                style={{ minWidth: 0, width: 0 }}
                onClick={props.onMoveRight}
              >
                {'>'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ArrayProxySnapshotViewerItem;
