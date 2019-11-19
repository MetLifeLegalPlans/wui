import React from 'react';
import { storiesOf } from '@storybook/react';

import Spacer from './spacer';
import Typography from '@/basics/typography';

storiesOf('Layout', module).add('Spacer', () => (
  <React.Fragment>
    <div>Below me is a vertical spacer.</div>
    <Spacer v={30} />
    <div>
      There is a horizontal spacer
      <Spacer h={30} inline />
      between us.
    </div>
    <div>There is a vertical spacer below me, but it is hidden on tablets and smaller.</div>
    <Spacer v={30} smDown />
    <div>The spacer above me is hidden on tablets and smaller.</div>
    <Typography variant="h2" component="div">
      This spacer
      <Spacer h={40} inline content={<span>&bull;</span>} />
      has content.
    </Typography>
  </React.Fragment>
));
