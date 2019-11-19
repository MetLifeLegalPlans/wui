import React from 'react';
import Grid from '@material-ui/core/Grid';
import { storiesOf } from '@storybook/react';

import WuiGrid from './grid';

storiesOf('Layout', module).add('Grid', () => (
  <WuiGrid container direction="column" reverseDirectionOnPhone>
    <Grid item xs={12}>
      I am on the left, but on the right on a phone.
    </Grid>
    <Grid item xs={12}>
      I am on the right, but on the left on a phone.
    </Grid>
  </WuiGrid>
));
