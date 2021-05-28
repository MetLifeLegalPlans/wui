```jsx
import { WuiThemeProvider } from '../theme';

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

<WuiThemeProvider>
  {Object.entries(textboxes).map(([name, props]) => (
    <div key={name}>
      <Textbox value="" {...props} label={name} />
      <Textbox disabled value="" {...props} label={`Disabled ${name}`} />
    </div>
  ))}
</WuiThemeProvider>;
```

```jsx
import { useState } from 'react';
import { WuiThemeProvider } from '../theme';
import Form from '../layout/form';
import Button from './button';

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

const TestForm = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
    }

    console.log(e.target);
  };

  const updateEmail = e => {
    setError('');
    setEmail(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textbox
        name="email"
        type="email"
        label="Email"
        value={email}
        onChange={updateEmail}
        error={error}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

<WuiThemeProvider>
  {Object.entries(textboxes).map(([name, props]) => (
    <div key={name}>
      <Textbox value="" {...props} label={name} />
      <Textbox disabled value="" {...props} label={`Disabled ${name}`} />
    </div>
  ))}

  <h1>Test Form</h1>
  <TestForm />
</WuiThemeProvider>;
```
