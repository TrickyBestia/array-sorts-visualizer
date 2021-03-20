import React, { useState } from 'react';
import CodeEditor from '../CodeEditor';
import { Box, Grid } from '@material-ui/core';
import ArrayProxySnapshotViewer from '../ArrayProxySnapshotViewer';
import snippets from '../CodeEditor/snippets';
import SnapshotsViewer from '../SnapshotsViewer';
import ExecutionController from '../ExecutionController';
import ArrayProxy from '../../utils/ArrayProxy';
import parse from '../../utils/SortFunctionParser';
import ArrayProxySnapshot from '../../utils/ArrayProxySnapshot';

const Content = (): JSX.Element => {
  const [iterator, setIterator] = useState<
    Iterator<undefined, undefined, undefined> | undefined
  >(undefined);
  const [arrayProxy] = useState(() => {
    const array = new Array<number>(10);
    for (let i = 0; i < array.length; i++) array[i] = i + 1;

    let tmp = 0;
    let current = 0;
    let top = array.length;
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    const arrayProxy = new ArrayProxy();
    arrayProxy.array = array;

    return arrayProxy;
  });
  const [currentSnapshot, setCurrentSnapshot] = useState(() =>
    arrayProxy.makeSnapshot('Current state...'),
  );
  const [snapshots, setSnapshots] = useState(
    () => [currentSnapshot] as readonly ArrayProxySnapshot[],
  );

  const onStep = (snapshot: ArrayProxySnapshot) => {
    setSnapshots((snapshots) => {
      const newSnapshots = snapshots.slice();
      newSnapshots.pop();
      newSnapshots.push(snapshot);
      setCurrentSnapshot(arrayProxy.makeSnapshot('Current state...'));
      newSnapshots.push(currentSnapshot);
      return newSnapshots;
    });
  };
  arrayProxy.onStep = onStep;

  return (
    <Box component="main" style={{ width: '100%', height: '100%' }}>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{ width: '100%', height: '100%' }}
        wrap="nowrap"
      >
        <Grid item style={{ flexGrow: 0.75, flexBasis: 0 }}>
          <CodeEditor
            readOnly={false}
            style={{ height: '100%' }}
            onChange={(value) => {
              setIterator(() => parse(value, arrayProxy));
              setCurrentSnapshot(arrayProxy.makeSnapshot('Current state...'));
              setSnapshots([currentSnapshot]);
            }}
            snippets={snippets}
          />
        </Grid>
        <Grid
          container
          item
          direction="column"
          style={{ flexGrow: 1, flexBasis: 0 }}
          spacing={1}
        >
          <Grid item style={{ flexGrow: 1, flexBasis: 0 }}>
            <ArrayProxySnapshotViewer
              snapshot={currentSnapshot}
              onMoveLeft={(index) => {
                [arrayProxy.array[index], arrayProxy.array[index - 1]] = [
                  arrayProxy.array[index - 1],
                  arrayProxy.array[index],
                ];
                onStep(
                  arrayProxy.makeSnapshot(
                    `Moved item at ${index} left manually.`,
                  ),
                );
              }}
              onMoveRight={(index) => {
                [arrayProxy.array[index], arrayProxy.array[index + 1]] = [
                  arrayProxy.array[index + 1],
                  arrayProxy.array[index],
                ];
                onStep(
                  arrayProxy.makeSnapshot(
                    `Moved item at ${index} right manually.`,
                  ),
                );
              }}
              onDelete={(index) => {
                arrayProxy.array.splice(index, 1);
                onStep(
                  arrayProxy.makeSnapshot(
                    `Deleted item at ${index} right manually.`,
                  ),
                );
              }}
            />
          </Grid>
          <Grid item style={{ flexBasis: 0 }}>
            <ExecutionController
              sortIterator={iterator}
              arrayProxy={arrayProxy}
              onSortDone={() => {
                onStep(arrayProxy.makeSnapshot('Sort done.'));
              }}
              addNewElement={(element) => {
                arrayProxy.array.push(element);
                onStep(
                  arrayProxy.makeSnapshot(
                    `Add element of value ${element} manually.`,
                  ),
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid item style={{ flexGrow: 1, flexBasis: 0, overflowY: 'auto' }}>
          <SnapshotsViewer
            snapshots={snapshots}
            onSelectedSnapshot={setCurrentSnapshot}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
