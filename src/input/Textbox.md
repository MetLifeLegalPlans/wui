```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

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

<ThemeProvider theme={theme}>
  {Object.entries(textboxes).map(([name, props]) => (
    <div key={name}>
      <Textbox value="" {...props} label={name} />
      <Textbox disabled value="" {...props} label={`Disabled ${name}`} />
    </div>
  ))}
</ThemeProvider>;
```
