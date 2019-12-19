```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const examples = {
  Standard: {},
};

<ThemeProvider theme={theme}>
  <div>
    {Object.entries(examples).map(([name, props]) => (
      <BorderedBox key={name} {...props}>
        {name}
      </BorderedBox>
    ))}
  </div>
</ThemeProvider>;
```
