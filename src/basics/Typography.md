```jsx
import { headerDefinitions, makeStyle } from './typography';

Object.entries(headerDefinitions).map(([variant, devices]) => (
  <React.Fragment key={variant}>
    <Typography variant={variant}>
      {variant}[{Object.entries(devices)
        .map(([device, styles]) => `${device[0]}: ${makeStyle(styles).fontSize}px`)
        .join(', ')}]
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
