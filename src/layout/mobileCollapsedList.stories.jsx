import React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from '@/basics/typography';

import MobileListContainer from './mobileListContainer';
import MobileCollapsedList from './mobileCollapsedList';
import Spacer from './spacer';

const range10 = [...Array(10).keys()].map(value => (
  <Typography key={value}>Item {value + 2}</Typography>
));

storiesOf('Layout', module).add('Mobile Collapsed List', () => (
  <div style={{ padding: 5 }}>
    <MobileCollapsedList>
      <Typography>I show one item on mobile when collapsed, but all on desktop</Typography>
      {range10}
    </MobileCollapsedList>

    <Spacer v={32} />

    <MobileCollapsedList initiallyShowUpTo={5}>
      <Typography>I show five items on mobile when collapsed, but all on desktop</Typography>
      {range10}
    </MobileCollapsedList>

    <Spacer v={32} />

    <MobileListContainer title="This is a title">
      <MobileCollapsedList initiallyShowUpTo={5}>
        <Typography>This is a list wrapped in a mobile list container</Typography>
        {range10}
      </MobileCollapsedList>
    </MobileListContainer>
  </div>
));
