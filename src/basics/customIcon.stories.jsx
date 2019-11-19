import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import CustomIcon from './customIcon';

storiesOf('Basics', module).add('CustomIcon', () => (
  <React.Fragment>
    <div>
      With String Color:
      <CustomIcon color="red" src={CheckCircleIcon} />
    </div>
    <div>
      With Theme Color:
      <CustomIcon src={CheckCircleIcon} color={theme => theme.palette.green.success} />
    </div>
    <div>
      With Size:
      <CustomIcon width={48} height={48} src={CheckCircleIcon} />
    </div>
  </React.Fragment>
));
