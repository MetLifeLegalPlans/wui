```jsx
import React, { useState } from 'react';
import Button from './button';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const options = [
  'Apple',
  'Orange',
  'Grape',
  'Watermelon',
  'Strawberry',
  'Pineapple',
  'Banana',
  'Avocado',
  'Apricot',
];

// A component is defined here so state hooks can be used instead storybook-state
const Example = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState(false);

  const mutateOptions = label => ({ label });

  const getOptionsByInputValue = value =>
    options
      .filter(option => option.toLowerCase().includes(value.toLowerCase().trim()))
      .map(mutateOptions);

  return (
    <React.Fragment>
      <Combobox
        label="I am a combobox for fruit"
        error={error}
        helperText={error ? 'This is an error state' : ''}
        onSelect={value => setSelectedValue(value || '')}
        getOptionsByInputValue={getOptionsByInputValue}
        selected={{ label: selectedValue }}
      />

      <Button variant="contained" color="primary" onClick={() => setError(prevError => !prevError)}>
        Toggle error
      </Button>
    </React.Fragment>
  );
};

<ThemeProvider theme={theme}>
  <Example />
</ThemeProvider>;
```
