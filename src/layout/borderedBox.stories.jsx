import React from 'react';
import { storiesOf } from '@storybook/react';

import BorderedBox from './borderedBox';

const examples = {
  Standard: {},
};

storiesOf('Layout', module).add('BorderedBox', () => (
  <div>
    {Object.entries(examples).map(([name, props]) => (
      <BorderedBox key={name} {...props}>
        {name}
      </BorderedBox>
    ))}
  </div>
));
