import React from 'react';
import { storiesOf } from '@storybook/react';

import DimensionLimiter from './dimensionLimiter';

const examples = {
  'maximum 30px tall': { v: 30 },
  'maximum 30px wide': { h: 30 },
  'maximum 5% tall': { v: '5%' },
  'maximum 5% wide': { h: '5%' },
};

storiesOf('Layout', module).add('DimensionLimiter', () => (
  <div>
    {Object.entries(examples).map(([name, props]) => (
      <div key={name} style={{ height: 100, marginBottom: 2, border: '1px solid grey' }}>
        {name}: <br />
        <DimensionLimiter key={name} {...props}>
          <img alt="150x150" src="https://via.placeholder.com/150" />
        </DimensionLimiter>
      </div>
    ))}
  </div>
));
