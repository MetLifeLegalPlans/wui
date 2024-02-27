```jsx
import { useState } from 'react';
import { WuiThemeProvider } from '../theme';

const tabs = [{ name: 'Home' }, { name: 'About' }];

const TabsTest = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return <SectionTabs onSelect={v => setSelectedTab(v)} tabs={tabs} selected={selectedTab} />;
};

<WuiThemeProvider>
  <TabsTest />
</WuiThemeProvider>;
```
