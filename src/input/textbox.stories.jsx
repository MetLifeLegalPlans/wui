import React from 'react';
import { storiesOf } from '@storybook/react';

import Textbox from './textbox';

const longErrorMessage = Array(5)
  .fill('This is a very long error message.')
  .join(' ');

const textboxes = {
  Empty: {},
  'Filled In': { value: 'Some value.' },
  Select: { options: { 1: 'One', 2: 'Two' } },
  Error: { error: longErrorMessage, value: 'Bad value.' },
  'With Helper Text': { helperText: 'This is helper text.' },
};

storiesOf('Input', module).add('Textbox', () =>
  Object.entries(textboxes).map(([name, props]) => (
    <div key={name}>
      <Textbox value="" {...props} label={name} />
      <Textbox disabled value="" {...props} label={`Disabled ${name}`} />
    </div>
  )),
);
