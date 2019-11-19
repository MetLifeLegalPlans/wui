import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from './spinner';

storiesOf('Basics', module).add('Spinner', () => (
  <React.Fragment>
    <Spinner />
    <Spinner
      color={theme => theme.palette.green.success}
      background={theme => theme.palette.common.white}
    />
  </React.Fragment>
));
