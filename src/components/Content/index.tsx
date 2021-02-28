import React, { useState } from 'react';
import CodeEditor from '../CodeEditor';
import { Box, Grid } from '@material-ui/core';
import ArrayProxyStepViewer from '../ArrayProxyStepViewer';
import snippets from '../CodeEditor/snippets';
import StepsViewer from '../StepsViewer';
import ExecutionController from '../ExecutionController';
import ArrayProxy from '../../utils/ArrayProxy';
import ArrayProxyStep from '../../utils/ArrayProxyStep';
import parse from '../../utils/SortFunctionParser';

export default function Content(): JSX.Element {
  const [iterator, setIterator] = useState<
    Iterator<undefined, undefined, undefined> | undefined
  >(undefined);
  const [arrayProxy] = useState(new ArrayProxy([3, 2, 5, 8, 5, 6]));
  const [currentStep, setCurrentStep] = useState(arrayProxy.currentState);
  const [steps, setSteps] = useState([
    currentStep,
  ] as readonly ArrayProxyStep[]);
  arrayProxy.onStep = (step) => {
    setSteps((steps) => {
      const newSteps = steps.slice();
      newSteps.pop();
      newSteps.push(step);
      setCurrentStep(arrayProxy.currentState);
      newSteps.push(currentStep);
      return newSteps;
    });
  };

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
              setSteps([currentStep]);
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
            <ArrayProxyStepViewer
              arrayProxyStep={currentStep}
              onMoveLeft={(index) => {
                const newArray = arrayProxy.array.slice();
                [newArray[index], newArray[index - 1]] = [
                  newArray[index - 1],
                  newArray[index],
                ];
                arrayProxy.edit(
                  newArray,
                  undefined,
                  undefined,
                  `Moved item at ${index} left manually.`,
                );
              }}
              onMoveRight={(index) => {
                const newArray = arrayProxy.array.slice();
                [newArray[index], newArray[index + 1]] = [
                  newArray[index + 1],
                  newArray[index],
                ];
                arrayProxy.edit(
                  newArray,
                  undefined,
                  undefined,
                  `Moved item at ${index} right manually.`,
                );
              }}
              onDelete={(index) => {
                const newArray = arrayProxy.array.slice();
                newArray.splice(index, 1);
                arrayProxy.edit(
                  newArray,
                  undefined,
                  undefined,
                  `Deleted item at ${index} right manually.`,
                );
              }}
            />
          </Grid>
          <Grid item style={{ flexBasis: 0 }}>
            <ExecutionController
              sortIterator={iterator}
              arrayProxy={arrayProxy}
              onSortDone={() => {
                arrayProxy.edit(undefined, undefined, undefined, 'Sort done.');
              }}
              addNewElement={(element) => {
                arrayProxy.edit(
                  arrayProxy.array.slice().concat([element]),
                  undefined,
                  undefined,
                  `Add element of value ${element} manually.`,
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid item style={{ flexGrow: 1, flexBasis: 0, overflowY: 'auto' }}>
          <StepsViewer steps={steps} onSelectedStep={setCurrentStep} />
        </Grid>
      </Grid>
    </Box>
  );
}
