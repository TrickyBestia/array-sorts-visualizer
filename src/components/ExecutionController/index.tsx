import { Button, Grid } from '@material-ui/core';
import { Add, PlayArrow, SkipNext } from '@material-ui/icons';
import React from 'react';
import ArrayProxy from '../../utils/ArrayProxy';

type Props = {
  sortIterator: Iterator<undefined, undefined, undefined> | undefined;
  arrayProxy: ArrayProxy;
  onSortDone: () => void;
  addNewElement: (element: number) => void;
};
export default function ExecutionController(props: Props): JSX.Element {
  const isEnabled = props.sortIterator !== undefined;
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Button
          variant="outlined"
          style={{ backgroundColor: '#00DD00' }}
          disabled={!isEnabled}
          onClick={async () => {
            for (;;) {
              if (props.sortIterator?.next().done) {
                props.onSortDone();
                break;
              }
              await new Promise((resolve) => setTimeout(resolve, 200));
            }
          }}
        >
          <PlayArrow />
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          style={{ backgroundColor: '#DDDD00' }}
          disabled={!isEnabled}
          onClick={() => {
            if (props.sortIterator?.next().done) {
              props.onSortDone();
            }
          }}
        >
          <SkipNext />
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{ backgroundColor: '#00DD00' }}
          variant="outlined"
          onClick={() => {
            const promptResult = prompt('Element?', '');
            if (promptResult === null) return;
            const element = Number.parseInt(promptResult);
            if (isNaN(element)) return;
            if (element <= 0) {
              alert('The number must be positive!');
              return;
            }
            props.addNewElement(element);
          }}
        >
          <Add />
        </Button>
      </Grid>
    </Grid>
  );
}
