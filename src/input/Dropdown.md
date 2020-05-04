```jsx
import Spacer from '..//layout/spacer';
import Typography from '../basics/typography';
import { WuiThemeProvider } from '../theme';

function onClick(option) {
  console.log(`You clicked: ${option.label}!`);
}

<WuiThemeProvider>
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
</WuiThemeProvider>;
```
