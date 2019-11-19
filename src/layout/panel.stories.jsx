import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Typography from '@/basics/typography';

import Panel from './panel';
import Spacer from './spacer';
import Link from '@/basics/link';
import Button from '@/input/button';
import PanelTitle from './panelTitle';
import TitleWithIcon from './titleWithIcon';

function willNotTrigger() {
  // eslint-disable-next-line
  console.log("I won't be triggered in a disabled panel.");
}

const panelTitleRight = (
  <React.Fragment>
    I am on the right{' '}
    <Link color="inherit" href="/">
      with a link!
    </Link>
  </React.Fragment>
);

storiesOf('Layout', module).add('Panel', () => (
  <div style={{ padding: 5 }}>
    <Panel>Standard</Panel>
    <Panel dashed>Dashed</Panel>
    <Panel active>Active</Panel>
    <Panel special>Highlighted</Panel>
    <Panel special indicatorVariant="alternate">
      Alternate highlight
    </Panel>
    <Panel borderless>Borderless</Panel>
    <Panel paddingless>Paddingless</Panel>
    <Panel extraVerticalPadding>Extra Vertical Padding</Panel>
    <Panel round>Round</Panel>
    <Panel tooltip>tooltip</Panel>
    <Panel round tooltip>
      Round tooltip
    </Panel>
    <Panel maxContentWidth={100}>With maxContentWidth=100</Panel>
    <Panel special>
      <Typography variant="h5">With Title</Typography>
    </Panel>
    <Panel special>
      <TitleWithIcon variant="h5" icon={<CheckCircleIcon />} title="With Title and Icon">
        Some Content
      </TitleWithIcon>
    </Panel>
    <Panel special>
      <TitleWithIcon
        variant="h5"
        hideIconOnPhone
        icon={<CheckCircleIcon />}
        title="This icon will be hidden on a phone"
      >
        Here is my content
      </TitleWithIcon>
    </Panel>
    <Panel lessPadding>
      <PanelTitle>This is the title</PanelTitle>
      This is the content of the panel.
    </Panel>
    <Panel lessPadding>
      <PanelTitle icon={CheckCircleIcon}>This one has an icon</PanelTitle>
      This is the content of the panel.
    </Panel>
    <Panel lessPadding>
      <PanelTitle right={panelTitleRight}>This one has something on the right</PanelTitle>
      This is the content of the panel.
    </Panel>
    <Panel lessPadding>
      <PanelTitle isNotice>This is a notice-style title</PanelTitle>
      This is the content of the panel.
    </Panel>

    <Panel lessPadding tableRow>
      <PanelTitle>This is a panel table</PanelTitle>
      This is the content of the first row
    </Panel>
    <Panel lessPadding tableRow special>
      This is a special row, which elevates it above the other rows
    </Panel>
    <Panel lessPadding tableRow>
      This is not a special row
    </Panel>

    <Spacer v={24} />

    <div style={{ background: 'white' }}>
      <Panel lessPadding disabled>
        <PanelTitle icon={CheckCircleIcon}>This panel is disabled.</PanelTitle>

        <Button color="primary" variant="contained" onClick={willNotTrigger}>
          I am disabled by the panel.
        </Button>
      </Panel>
    </div>
  </div>
));
