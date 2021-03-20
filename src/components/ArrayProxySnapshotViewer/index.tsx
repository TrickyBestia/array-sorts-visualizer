import { Grid, Paper, useTheme } from '@material-ui/core';
import React from 'react';
import ArrayProxySnapshot from '../../utils/ArrayProxySnapshot';
import ArrayProxySnapshotViewerItem from '../ArrayProxySnapshotViewerItem';

type Props = {
  snapshot: ArrayProxySnapshot;
  onMoveRight: (index: number) => void;
  onMoveLeft: (index: number) => void;
  onDelete: (index: number) => void;
};

const ArrayProxySnapshotViewer = (props: Props): JSX.Element => {
  const theme = useTheme();

  const maxItem = Math.max(...props.snapshot.array.toArray());
  const items = props.snapshot.array.map((item, index) => {
    let indexColor = theme.palette.secondary.main;
    if (
      index === props.snapshot.primaryIndex &&
      index === props.snapshot.secondaryIndex
    )
      indexColor = '#2962ff';
    else if (index === props.snapshot.primaryIndex) indexColor = '#64dd17';
    else if (index === props.snapshot.secondaryIndex) indexColor = '#FF2020';
    return (
      <ArrayProxySnapshotViewerItem
        indexColor={indexColor}
        key={index}
        index={index}
        value={item}
        maxValue={maxItem}
        canMoveLeft={index !== 0}
        canMoveRight={index !== props.snapshot.array.count() - 1}
        onMoveRight={() => props.onMoveRight(index)}
        onMoveLeft={() => props.onMoveLeft(index)}
        onDelete={() => props.onDelete(index)}
      />
    );
  });
  return (
    <Paper
      style={{
        height: '100%',
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Grid
        style={{ height: '100%' }}
        container
        justify="space-between"
        alignItems="stretch"
        direction="row"
        wrap="nowrap"
      >
        {items}
      </Grid>
    </Paper>
  );
};

export default ArrayProxySnapshotViewer;
