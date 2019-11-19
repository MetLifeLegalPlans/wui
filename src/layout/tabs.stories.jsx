import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import Tabs from './tabs';
import TabDivider from './tabDivider';

const dividersContent = (
  <React.Fragment>
    I am a selected tab. Below me is a standard divider.
    <TabDivider />
    Below me is a dashed divider.
    <TabDivider dashed />
    Below me is an expanded divider.
    <TabDivider expanded />
    Below me is an expanded and dashed divider.
    <TabDivider expanded dashed />
    Below me is a divider without margin.
    <TabDivider noMargin />
    Below me is a divider with half the standard margin.
    <TabDivider halfMargin />
  </React.Fragment>
);

const tabs = [
  { name: 'Unselected', content: 'I was unselected.' },
  { name: 'Selected', content: dividersContent },
  { name: 'Special', content: 'I am a special tab.', special: true },
  { name: 'Disabled Tab', content: 'I am disabled.', disabled: true },
];

const noticeTabs = [
  { name: 'Unselected', content: 'I was unselected.', noticeText: 'Normal Notice' },
  {
    name: 'Selected',
    content: dividersContent,
    primary: true,
    noticeText: 'Primary Notice',
  },
  {
    name: 'Special',
    content: 'I am a special tab.',
    special: true,
    noticeText: 'Special Notice',
  },
  { name: 'Disabled Tab', content: 'I am disabled.', disabled: true },
];

const store = new Store({
  selected: 1,
});

storiesOf('Layout', module).add('Tabs', () => (
  <div style={{ padding: 5 }}>
    <State store={store}>
      <Tabs tabs={tabs} onSelect={value => store.set({ selected: value })} />
      <div style={{ height: 25 }} />
      <p>These tabs have notices in place of the selection indicator:</p>
      <Tabs
        tabsFillWidth={false}
        tabs={noticeTabs}
        onSelect={value => store.set({ selected: value })}
        nextToTabs={
          <p style={{ width: '200px', marginLeft: '30px' }}>
            This is an extra element that will appear next to the the tabs
          </p>
        }
      />
    </State>
  </div>
));
