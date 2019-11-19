import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './checkbox';

const checkboxes = {
  Unchecked: {},
  Checked: { checked: true },
};

storiesOf('Input', module).add('Checkbox', () =>
  Object.entries(checkboxes).map(([name, props]) => (
    <div key={name}>
      <Checkbox {...props} label={name} />
      <Checkbox disabled {...props} label={`${name} Disabled`} />
    </div>
  )),
);
