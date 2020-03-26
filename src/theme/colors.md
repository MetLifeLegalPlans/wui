```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import Grid from '../layout/grid';
import Spacer from '../layout/spacer';
import Typography from '../basics/typography';

const wuiColorGroups = ['text', 'grey', 'blue', 'green', 'background'];

<ThemeProvider theme={theme}>
  <Grid container direction="row" spacing={3}>
    {wuiColorGroups.map(group => (
      <Grid key={group} container item direction="column" sm={2}>
        {Object.keys(theme.palette[group]).map(color => (
          <Grid key={color} item>
            <div
              style={{
                height: 50,
                backgroundColor: theme.palette[group][color],
              }}
            />
            <Typography variant="caption">{color}</Typography>
            <Typography variant="caption">{theme.palette[group][color].toLowerCase()}</Typography>
            <Spacer v={24} />
          </Grid>
        ))}
      </Grid>
    ))}
  </Grid>
</ThemeProvider>;
```
