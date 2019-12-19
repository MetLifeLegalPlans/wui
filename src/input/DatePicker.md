```jsx
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

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

<ThemeProvider theme={theme}>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {Object.entries(textboxes).map(([name, props]) => (
      <div key={name}>
        <DatePicker label={name} onChange={log} {...props} />
        <DatePicker disabled onChange={log} label={`Disabled ${name}`} {...props} />
      </div>
    ))}
  </MuiPickersUtilsProvider>
</ThemeProvider>;
```
