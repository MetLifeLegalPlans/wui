```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

<ThemeProvider theme={theme}>
  <div style={{ position: 'relative' }}>
    <Modal
      open
      onClose={() => console.log('clicked close')}
      title="This is a title"
      disablePortal
      hideBackdrop
      disableScrollLock
      style={{ position: 'relative' }}
    >
      This is the content.
    </Modal>
  </div>
</ThemeProvider>;
```
