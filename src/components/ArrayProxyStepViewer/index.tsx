import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import ArrayProxyStep from '../../utils/ArrayProxyStep';
import ArrayProxyStepViewerItem from '../ArrayProxyStepViewerItem';

type Props = {
  arrayProxyStep: ArrayProxyStep;
  onMoveRight: (index: number) => void;
  onMoveLeft: (index: number) => void;
  onDelete: (index: number) => void;
};
export default function ArrayProxyStepViewer(props: Props): JSX.Element {
  const maxItem = Math.max(...props.arrayProxyStep.array);
  const items = props.arrayProxyStep.array.map((item, index) => {
    let indexColor = '';
    if (
      index === props.arrayProxyStep.primaryIndex &&
      index === props.arrayProxyStep.secondaryIndex
    )
      indexColor = '#FFFF00';
    else if (index === props.arrayProxyStep.primaryIndex)
      indexColor = '#BFFF00';
    else if (index === props.arrayProxyStep.secondaryIndex)
      indexColor = '#FF2020';
    return (
      <ArrayProxyStepViewerItem
        indexColor={indexColor}
        key={index}
        index={index}
        value={item}
        maxValue={maxItem}
        canMoveLeft={index !== 0}
        canMoveRight={index !== props.arrayProxyStep.array.length - 1}
        onMoveRight={props.onMoveRight}
        onMoveLeft={props.onMoveLeft}
        onDelete={props.onDelete}
      />
    );
  });
  return (
    <Paper style={{ height: '100%' }}>
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
}
