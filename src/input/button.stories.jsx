import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { isWidthDown } from '@material-ui/core/withWidth';

import Button from './button';

const buttons = {
  Text: { variant: 'text' },
  Outlined: { variant: 'outlined' },
  'Small Text': { variant: 'text', size: 'small' },
  'Large Outlined': { variant: 'outlined', size: 'large' },
  'Contained Primary': { color: 'primary', variant: 'contained' },
  'Text with Icon': { variant: 'text', additionalContent: <ArrowBackIcon /> },
  'Large Contained Primary': { color: 'primary', variant: 'contained', size: 'large' },
  'Full Width on Phone': { variant: 'outlined', fullWidth: width => isWidthDown('xs', width) },
  'Small Text with Icon': { variant: 'text', size: 'small', additionalContent: <ArrowBackIcon /> },
};

const store = new Store({
  processing: false,
});

const example = (name, exampleProps) => state => {
  const { additionalContent, ...props } = exampleProps;
  props.processing = state.processing;

  props.onClick = () => {
    store.set({ processing: true });
    setTimeout(() => store.set({ processing: false }), 2000);
  };

  return (
    <div key={name}>
      <Button {...props}>
        {additionalContent}
        {name}
      </Button>
      <Button noMinWidth {...props}>
        {additionalContent}
        {name} No Min Width
      </Button>
      <Button disabled {...props}>
        {additionalContent}
        {name} Disabled
      </Button>
      <Button {...props} processing>
        {additionalContent}
        {name} Processing
      </Button>
      <br />
      <br />
    </div>
  );
};

storiesOf('Input', module).add('Button', () => (
  <State store={store}>
    {state => Object.entries(buttons).map(entry => example(...entry)(state))}
  </State>
));
