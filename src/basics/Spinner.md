Plain

```jsx
<Spinner />
```

With theme colors

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

<ThemeProvider theme={theme}>
  <Spinner
    color={theme => theme.palette.green.success}
    background={theme => theme.palette.common.white}
  />
</ThemeProvider>;
```
