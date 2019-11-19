import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import SectionTabs from './sectionTabs';

const tabs = [
  { name: 'Unselected', content: 'I was unselected.' },
  { name: 'Selected', content: 'I am selected.' },
  { name: 'Disabled Tab', content: 'I am disabled.', disabled: true },
];

const store = new Store({
  selected: 1,
});

storiesOf('Layout', module).add('SectionTabs', () => (
  <div style={{ padding: 5 }}>
    <State store={store}>
      <SectionTabs tabs={tabs} onSelect={value => store.set({ selected: value })} />
    </State>

    <State store={store}>{state => tabs[state.selected].content}</State>
  </div>
));
