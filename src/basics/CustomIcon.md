With String Color:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
<CustomIcon color="red" src={CheckCircleIcon} />;
```

With Theme Color:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { WuiThemeProvider } from '../theme';

<WuiThemeProvider>
  <CustomIcon src={CheckCircleIcon} color={theme => theme.palette.green.success} />
</WuiThemeProvider>;
```

With Size:

```jsx
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
<CustomIcon width={48} height={48} src={CheckCircleIcon} />;
```
