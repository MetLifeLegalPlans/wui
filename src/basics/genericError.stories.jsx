import React from 'react';
import { storiesOf } from '@storybook/react';

import GenericError from './genericError';

storiesOf('Basics', module).add('GenericError', () => (
  <React.Fragment>
    <GenericError />
    <GenericError message="Oh no! There was an error." />
    <GenericError smallIcon message="This error has a smaller icon" />
  </React.Fragment>
));
