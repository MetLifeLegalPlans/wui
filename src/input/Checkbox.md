```jsx
import { WuiThemeProvider } from '../theme';

<WuiThemeProvider>
  <Checkbox label="Unchecked" />
  <Checkbox label="Unchecked disabled" disabled />
</WuiThemeProvider>;
```

```jsx
import { WuiThemeProvider } from '../theme';

<WuiThemeProvider>
  <Checkbox label="Checked" checked />
  <Checkbox label="Checked disabled" checked disabled />
</WuiThemeProvider>;
```

```jsx
import { useState } from 'react';
import { WuiThemeProvider } from '../theme';

const title = 'Checkbox Screen Reader Test';

const CheckboxScreenReaderTest = () => {
  const [agreed, setAgreed] = useState(false);
  const label = 'I agree to the terms and conditions.';

  return (
    <>
      <Checkbox
        checked={agreed}
        label={label}
        onChange={() => {
          setAgreed(!agreed);
        }}
        aria-label={`${title} ${label}`}
        id={title}
      />
    </>
  );
};

<WuiThemeProvider>
  <h1>{title}</h1>
  <CheckboxScreenReaderTest />
</WuiThemeProvider>;
```
