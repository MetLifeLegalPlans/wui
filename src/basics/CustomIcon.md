With String Color:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
<CustomIcon color="red" src={CheckCircleIcon} />;
```

With Theme Color:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

<ThemeProvider theme={theme}>
  <CustomIcon src={CheckCircleIcon} color={theme => theme.palette.green.success} />
</ThemeProvider>;
```

With Size:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
<CustomIcon width={48} height={48} src={CheckCircleIcon} />;
```
