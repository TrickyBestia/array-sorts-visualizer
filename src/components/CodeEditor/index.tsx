import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import {
  Box,
  BoxProps,
  Button,
  Grid,
  Paper,
  useTheme,
} from '@material-ui/core';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import './style.css';
import { List } from 'immutable';

type Props = {
  snippets: List<{ name: string; value: string }>;
  onChange: { (value: string): void };
  readOnly: boolean;
  style: BoxProps;
};

const CodeEditor = (props: Props): JSX.Element => {
  const [value, setValue] = useState(
    props.snippets.find((snippet) => snippet.name === 'default')?.value ?? '',
  );
  useEffect(() => props.onChange(value), []);

  return (
    <Box
      className="codeEditor"
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...props.style,
      }}
    >
      <Paper
        style={{
          height: '100%',
          backgroundColor: useTheme().palette.primary.light,
        }}
      >
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
          {props.snippets.map((snippet) => (
            <Grid item key={snippet.name}>
              <Button
                color="secondary"
                disabled={props.readOnly}
                variant="contained"
                onClick={() => {
                  setValue(snippet.value);
                  props.onChange(snippet.value);
                }}
              >
                {snippet.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CodeEditor;
