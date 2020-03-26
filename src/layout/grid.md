```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import BorderedBox from './borderedBox';

<ThemeProvider theme={theme}>
  <Grid container direction="row" reverseDirectionOnPhone>
    <Grid item xs={4}>
      <BorderedBox>LEFT</BorderedBox>
    </Grid>
    <Grid item grow={1}>
      <BorderedBox>RIGHT</BorderedBox>
    </Grid>
  </Grid>
</ThemeProvider>;
```
