import React from 'react';
import { storiesOf } from '@storybook/react';

import Tooltip from './tooltip';

storiesOf('Layout', module).add('Tooltip', () => <Tooltip title="I am a tooltip!" />);
