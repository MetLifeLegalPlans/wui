import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { storiesOf } from '@storybook/react';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import DatePicker from './datePicker';

const longErrorMessage = Array(5)
  .fill('This is a very long error message.')
  .join(' ');

const textboxes = {
  Empty: { value: null },
  'Filled In': { value: new Date() },
  Error: { error: longErrorMessage, value: 'Bad value.' },
  'With Helper Text': { helperText: 'This is helper text.' },
};

function log(date) {
  // eslint-disable-next-line
  console.log(date);
}

storiesOf('Input', module).add('DatePicker', () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {Object.entries(textboxes).map(([name, props]) => (
      <div key={name}>
        <DatePicker label={name} onChange={log} {...props} />
        <DatePicker disabled onChange={log} label={`Disabled ${name}`} {...props} />
      </div>
    ))}
  </MuiPickersUtilsProvider>
));
