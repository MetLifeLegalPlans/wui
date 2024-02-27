```jsx
import { useState } from 'react';
import { WuiThemeProvider } from '../theme';

const tabs = [
  { id: 'home', name: 'Home' },
  { id: 'about', name: 'About' },
];

const TabsExample = () => {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <React.Fragment>
      <Tabs tabs={tabs} selected={tab} onSelect={id => setTab(id)} />
    </React.Fragment>
  );
};

<WuiThemeProvider>
  <TabsExample />
</WuiThemeProvider>;
```
