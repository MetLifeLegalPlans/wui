```jsx
import { headerDefinitions, makeStyle } from './typography';

Object.entries(headerDefinitions).map(([variant, devices]) => (
  <React.Fragment key={variant}>
    <Typography variant={variant}>
      {variant}[
      {Object.entries(devices)
        .map(([device, styles]) => `${device[0]}: ${makeStyle(styles).fontSize}px`)
        .join(', ')}
      ]
    </Typography>
  </React.Fragment>
));
```

```jsx
import { bodyDefinitions, makeStyle } from './typography';

Object.keys(bodyDefinitions).map(variant => (
  <Typography key={variant} variant={variant}>
    {variant} ({bodyDefinitions[variant].aliases.join(', ')}) [
    {makeStyle(bodyDefinitions[variant].style).fontSize}px]
  </Typography>
));
```

With [default theme greys](https://material-ui.com/customization/default-theme/):

```jsx
const DEFAULT_THEME_GREYS = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  'A100',
  'A200',
  'A400',
  'A700',
];

DEFAULT_THEME_GREYS.map(shade => (
  <Typography key={shade} color={String(shade)}>
    HELLO
  </Typography>
));
```
