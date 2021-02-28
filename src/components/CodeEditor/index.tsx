import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { Box, BoxProps, Button, Grid, Paper } from '@material-ui/core';
import './style.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

type Props = {
  snippets: { name: string; value: string }[];
  onChange: { (value: string): void };
  readOnly: boolean;
  style: BoxProps;
};
export default function CodeEditor(props: Props): JSX.Element {
  const [value, setValue] = useState(
    props.snippets.find((snippet) => snippet.name === 'default')?.value ?? '',
  );
  useEffect(() => props.onChange(value), []);
  const snippetButtons: JSX.Element[] = [];
  props.snippets.forEach((snippet) => {
    snippetButtons.push(
      <Grid item key={snippet.name}>
        <Button
          color="primary"
          disabled={props.readOnly}
          variant="outlined"
          onClick={() => {
            setValue(snippet.value);
            props.onChange(snippet.value);
          }}
        >
          {snippet.name}
        </Button>
      </Grid>,
    );
  });

  return (
    <Box
      className="codeEditor"
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...props.style,
      }}
    >
      <Paper style={{ height: '100%' }}>
        <Editor
          readOnly={props.readOnly}
          value={value}
          onValueChange={(value) => {
            setValue(value);
            props.onChange(value);
          }}
          highlight={(value) => {
            /* eslint-disable @typescript-eslint/no-unsafe-return */
            /* eslint-disable @typescript-eslint/no-unsafe-member-access */
            /* eslint-disable @typescript-eslint/no-unsafe-call */
            return Prism.highlight(
              value,
              Prism.languages.javascript,
              'javascript',
            );
            /* eslint-enable @typescript-eslint/no-unsafe-return */
            /* eslint-enable @typescript-eslint/no-unsafe-member-access */
            /* eslint-enable @typescript-eslint/no-unsafe-call */
          }}
          padding={10}
          tabSize={2}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            overflow: 'auto',
            height: '100%',
          }}
        />
      </Paper>
      <Box marginTop={1}>
        <Grid spacing={1} justify="space-between" container>
          {snippetButtons}
        </Grid>
      </Box>
    </Box>
  );
}
