```jsx
import { WuiThemeProvider } from '../theme';

import Spacer from '../layout/spacer';

<WuiThemeProvider>
  <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
    <Button variant="text">Text Button</Button>
    <Spacer v={30} />
    <Button variant="outlined">Outlined Button</Button>
    <Spacer v={30} />
    <Button color="primary" variant="contained">
      Contained Button
    </Button>
    <Spacer v={30} />
    <Button color="primary">Button</Button>
  </div>
</WuiThemeProvider>;
```
