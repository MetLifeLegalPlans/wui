```jsx
import Spacer from '..//layout/spacer';
import Typography from '../basics/typography';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

function onClick(option) {
  console.log(`You clicked: ${option.label}!`);
}

<ThemeProvider theme={theme}>
  <Typography variant="medium">
    <Spacer inline h={100} />
    <Dropdown
      label="Open Menu"
      options={[
        { label: 'First Item', onClick },
        { label: 'Second Item', onClick },
        { label: 'The Last Item', onClick },
      ]}
    />
  </Typography>
</ThemeProvider>;
```
