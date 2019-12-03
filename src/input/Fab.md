```jsx
import AddIcon from '@material-ui/icons/Add';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import Fab from './fab';
import Spacer from '../layout/spacer';

const buttons = {
  Standard: { icon: AddIcon },
  'Small Font': { icon: AddIcon, size: 'small' },
  'Icon on Right': { icon: AddIcon, iconAlign: 'right' },
};

<ThemeProvider theme={theme}>
  {Object.entries(buttons).map(([name, props]) => (
    <div key={name}>
      <Fab {...props} label={name} />
      <Spacer h={30} inline />
      <Fab disabled {...props} label={`${name} Disabled`} />
    </div>
  ))}
</ThemeProvider>;
```
