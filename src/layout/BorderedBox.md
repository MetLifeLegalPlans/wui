```jsx
import { WuiThemeProvider } from '../theme';

const examples = {
  Standard: {},
};

<WuiThemeProvider>
  <div>
    {Object.entries(examples).map(([name, props]) => (
      <BorderedBox key={name} {...props}>
        {name}
      </BorderedBox>
    ))}
  </div>
</WuiThemeProvider>;
```
