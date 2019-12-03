```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

<ThemeProvider theme={theme}>
  <Checkbox label="Unchecked" />
  <Checkbox label="Unchecked disabled" disabled />
</ThemeProvider>;
```

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

<ThemeProvider theme={theme}>
  <Checkbox label="Checked" checked />
  <Checkbox label="Checked disabled" checked disabled />
</ThemeProvider>;
```
