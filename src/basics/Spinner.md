Plain

```jsx
<Spinner />
```

With theme colors

```jsx
import { WuiThemeProvider } from '../theme';

<WuiThemeProvider>
  <Spinner
    color={theme => theme.palette.green.success}
    background={theme => theme.palette.common.white}
  />
</WuiThemeProvider>;
```
