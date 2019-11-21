`wui` is a theme for the popular React `material-ui` UI framework. Please see [their website](https://material-ui.com/getting-started/installation/) for detailed installation instructions, but we will summarize it here.

### Create a new react application

```bash
npx create-react-app example-wui-site && cd example-wui-site
```

### Install `material-ui`

#### With `npm`:

```bash
npm install --save @material-ui/core @material-ui/icons @material-ui/styles
```

#### With `yarn`:

```bash
yarn add @material-ui/core @material-ui/icons @material-ui/styles
```

### Add a font stylesheet

`wui` was built around [Averta PE](https://www.myfonts.com/fonts/intelligent-foundry/averta/), but we recognize that the cost of font licensing can be prohibitive for open source projects.

If `Averta PE` cannot be found, we fall back to the standard MUI `Roboto` font. To add that, place

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

in the `<head>` section of your website.

### Import the `wui` theme and supply it to your application

A typical installation would resemble this:

```jsx static
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@bequestinc/wui/theme';

const App = ({ children }) => (
  <>
    <CssBaseline />

    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
```

... where `{children}` is the rest of your application.
