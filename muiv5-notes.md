## Libraries/Versions Needed

    - "@material-ui/core": "^5.0.0"
    - "@emotion/react": "^11.0.0",
    - "@emotion/styled": "^11.0.0",

    - yarn add @material-ui/core@next @emotion/react @emotion/styled

## Breaking Changes with supported browsers & other libraries

- The minimum supported version of React was increased from v16.8.0 to v17.0.0.
- Node 12 (up from 8)
- Chrome 84 (up from 49)
- Edge 85 (up from 14)
- Firefox 78 (up from 52)
- Safari 13 (macOS) and 12.2 (iOS) (up from 10)
  The style library used by default in v5 is emotion

  While migrating from JSS to emotion, and if you are using JSS style overrides for your components (for example overrides created by makeStyles), you will need to take care of the CSS injection order.

```js
import * as React from 'react';
import { StyledEngineProvider } from '@material-ui/core/styles';

export default function GlobalCssPriority() {
  return (
    <StyledEngineProvider injectFirst>
      {/* Your component tree. import * as React from 'react';
import { StylesProvider } from '@material-ui/core';

export default function GlobalCssPriority() {
  return (
    <StylesProvider injectFirst>
      {/* Your component tree. */}
    </StylesProvider>
  );
}
```

---

## Other breaking changes

- The function createMuiTheme was renamed to createTheme to make more intuitive to use with ThemeProvider.

- The default background color is now #fff in light mode and #121212 in dark mode. This matches the Material Design guidelines.

- Breakpoints are now treated as values instead of ranges. The behavior of down(key) was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. between(start, end) was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). When using the down() breakpoints utility you need to update the breakpoint key by one step up. When using the between(start, end) the end breakpoint should also be updated by one step up. Thankfully there's a list of all available **[CODEMODS](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md)** to make the migration from v4 -> v5 a lot easier.

- breakpoint sizes have changed as follows
  1. xs: 0 -> 0
  2. sm: 600 -> 600
  3. md: 960 -> 900
  4. lg: 1280 -> 1200
  5. xl: 1920

<br/>

- The createStyles function from @mui/material/styles was moved to the one exported from @mui/styles.

- The makeStyles function from @mui/material/styles was moved to the one exported from @mui/styles.

- The ThemeProvider component from @mui/material/styles was moved to the one exported from @mui/styles.

<br/>

**ALONG WITH THE LIST OF CHANGES MENTIONED ABOVE THERE ARE SEVERAL OTHER BREAKING CHANGES RELATED TO SYNTAX & STYLING. PLEASE REFER TO [MUI-DOCS](https://mui.com/guides/migration-v4/) TO SEE THE ENTIRE LIST**
