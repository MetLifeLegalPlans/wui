import React from 'react';
import { storiesOf } from '@storybook/react';

import MaxPageWidth from './maxPageWidth';

const longContent = Array(10)
  .fill('This content is limited to the max page width.')
  .join(' ');

storiesOf('Layout', module).add('MaxPageWidth', () => <MaxPageWidth>{longContent}</MaxPageWidth>);
