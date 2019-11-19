import React from 'react';
import { storiesOf } from '@storybook/react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Carousel from './carousel';
import Spacer from './spacer';

const styles = { root: { height: '100%' } };
const FullHeightPaper = withStyles(styles)(Paper);

const slideContent = (
  <React.Fragment>
    <p>This slide has longer content than the others</p>
    <Spacer v={45} />
    <p>Slides with a height set to 100% will match the tallest slide</p>
  </React.Fragment>
);

const slides = [
  { title: 'Slide One', content: slideContent },
  { title: 'Slide Two' },
  { title: 'Slide Three' },
].map(slide => (
  <FullHeightPaper key={slide.title}>
    <h2>{slide.title}</h2>
    {slide.content}
  </FullHeightPaper>
));

storiesOf('Layout', module).add('Carousel', () => <Carousel>{slides}</Carousel>);
