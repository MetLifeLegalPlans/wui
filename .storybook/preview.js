import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const withThemeProvider = (Story, context) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
