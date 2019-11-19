import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import Theme from '@/theme';

// automatically import all files ending in *.stories.jsx
configure(require.context('../src', true, /\.stories\.jsx?$/), module);

// Wrap each story with our theme provider. When using WUI
//   controls, they must be wrapped in the WUI theme.
addDecorator(story => <Theme>{story()}</Theme>);
