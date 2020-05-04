```jsx
import { WuiThemeProvider } from '../theme';

<WuiThemeProvider>
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
</WuiThemeProvider>;
```
