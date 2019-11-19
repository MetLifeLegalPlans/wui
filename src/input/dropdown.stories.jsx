import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from './dropdown';
import Spacer from '@/layout/spacer';
import Typography from '@/basics/typography';

function onClick(option) {
  // eslint-disable-next-line
  console.log(`You clicked: ${option.label}!`);
}

storiesOf('Input', module).add('Dropdown', () => (
  <React.Fragment>
    <Typography variant="medium">
      <Spacer inline h={100} />
      <Dropdown
        label="Open Menu"
        options={[
          { label: 'First Item', onClick },
          { label: 'Second Item', onClick },
          { label: 'The Last Item', onClick },
        ]}
      />
    </Typography>
  </React.Fragment>
));
