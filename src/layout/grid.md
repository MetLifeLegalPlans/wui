```jsx
import { WuiThemeProvider } from '../theme';
import theme from '../theme';
import BorderedBox from './borderedBox';

<WuiThemeProvider>
  <Grid container direction="row" reverseDirectionOnPhone>
    <Grid item xs={4}>
      <BorderedBox>LEFT</BorderedBox>
    </Grid>
    <Grid item grow={1}>
      <BorderedBox>RIGHT</BorderedBox>
    </Grid>
  </Grid>
</WuiThemeProvider>;
```
