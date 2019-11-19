import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from './link';
import Typography, { bodyDefinitions, headerDefinitions, makeStyle } from './typography';

storiesOf('Basics', module).add('Typography', () => (
  <React.Fragment>
    {Object.entries(headerDefinitions).map(([variant, devices]) => (
      <React.Fragment key={variant}>
        <Typography variant={variant}>
          {variant} [
          {Object.entries(devices)
            .map(([device, styles]) => `${device[0]}: ${makeStyle(styles).fontSize}px`)
            .join(', ')}
          ]
        </Typography>
      </React.Fragment>
    ))}

    {Object.keys(bodyDefinitions).map(variant => (
      <Typography key={variant} variant={variant}>
        {variant} ({bodyDefinitions[variant].aliases.join(', ')}) [
        {makeStyle(bodyDefinitions[variant].style).fontSize}px]
      </Typography>
    ))}

    <Typography>
      <Link href="https://www.google.com">This is a link</Link>
    </Typography>

    <Typography color="disabled">This text is disabled.</Typography>
  </React.Fragment>
));
