import React from 'react';
import { storiesOf } from '@storybook/react';

import Countdown from './countdown';

function finished() {
  // eslint-disable-next-line
  console.log('Finished!');
}

storiesOf('Basics', module).add('Countdown', () => (
  <React.Fragment>
    <Countdown onFinish={finished} end={Date.now() + 5000} />
  </React.Fragment>
));
