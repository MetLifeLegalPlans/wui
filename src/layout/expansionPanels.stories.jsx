import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite from '@material-ui/icons/Favorite';

import Typography from '@/basics/typography';
import Spacer from './spacer';

import {
  ExclusivePanelGroup,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconPanel,
} from './expansionPanels';

// To beef up the panels and really show them expanding and contracting
const lipsumContent = (
  <ExpansionPanelDetails>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et doloremagna aliqua. Risus pretium quam vulputate dignissim suspendisse in est. Ut
      tristique et egestas quis ipsum. Massa eget egestas purus viverra accumsan in nisl nisi. Ut
      diam quam nulla porttitor massa id neque. Ipsum nunc aliquet bibendum enim facilisis. Quis vel
      eros donec ac. In iaculis nunc sed augue lacus viverra vitae. Id interdum velit laoreet id
      donec ultrices. Convallis aenean et tortor at risus viverra adipiscing at in. Justo donec enim
      diam vulputate. Vivamus arcu felis bibendum ut tristique et egestas quis. Augue eget arcu
      dictum varius duis at consectetur lorem donec.
    </Typography>
  </ExpansionPanelDetails>
);

const genPanel = text => (
  <ExpansionPanel>
    <ExpansionPanelSummary>
      <Typography variant="intro">{text}</Typography>
    </ExpansionPanelSummary>
    {lipsumContent}
  </ExpansionPanel>
);

storiesOf('Layout', module).add('Expansion Panel', () => (
  <div style={{ padding: 5 }}>
    {genPanel('I am a basic panel')}
    {genPanel('I am another basic panel')}

    <IconPanel icon={<Favorite />}>
      <ExpansionPanelSummary>
        <Typography variant="intro">I am a panel with an icon past the bottom border</Typography>
      </ExpansionPanelSummary>
      {lipsumContent}
    </IconPanel>

    <Spacer v={32} />

    <ExclusivePanelGroup>
      {genPanel('I am in an exclusive group')}
      {genPanel('When others are open, I am closed automatically')}
      {genPanel('I am also in an exclusive group')}
    </ExclusivePanelGroup>
  </div>
));
