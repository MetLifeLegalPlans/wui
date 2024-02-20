import React, { useRef } from 'react';
import {
  createMuiTheme,
  createGenerateClassName,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import planHealthMeterGradient from './planHealthMeter';

import { addTypography } from './basics/typography';

const inputText = '#595959';
const greenSuccess = '#1bc092';
const redError = '#ff5959';
const textboxBorder = '#c5cdd5';
const textboxFocus = '#4c84f5';
const panelBorder = '#DBDCE2';
const unselectedTab = '#f4f5f7';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['AvertaPE', 'Roboto'],
  },
  palette: {
    text: {
      light: '#e2e2e2',
      error: redError,
      primary: '#333647',
      disabled: '#878992',
      secondary: '#525252',
      superhero: inputText,
    },
    error: {
      main: '#DE0007',
    },
    grey: {
      inputText,
      textboxBorder,
      selectedTab: '#8798ad',
      bannerBorder: '#d3dde4',
      unselectedTab,
      panelBorder,
      placeholderText: '#989898',
      disabledButtonBorder: '#cbcfd4',
      modalBackground: 'rgba(244, 245, 247, 0.64)',
      lightBackground: '#fafafa',
    },
    blue: {
      textboxFocus,
      hover: '#5a74d3',
      focus: '#304386',
      banner: '#e1e9ef',
      default: '#3752a9',
      disabled: '#8c9cd5',
      checkboxCheck: '#0065ff',
      noticeBackground: '#dfe9fd',
      active: '#3c59ba',
    },
    green: {
      success: greenSuccess,
    },
    background: {
      default: '#f4f5f7',
    },
  },
  dimensions: {
    borderRadius: 3,
    borderRadiusLarge: 12,
    panelSpacing: {
      phone: 16,
      tablet: 32,
      default: 24,
    },
  },
  gradients: {
    special: `linear-gradient(247.09deg, ${greenSuccess} 0%, #4eb0be 100%), ${greenSuccess}`,
    planHealthMeter: planHealthMeterGradient,
  },
  customShadows: {
    fab: '0 4px 6px 0 rgba(0, 0, 0, 0.14)',
    fabHover: '0 4px 7px 0 rgba(0, 0, 0, 0.14)',
    standard: '0 5px 25px 1px rgba(0, 0, 0, 0.06)',
    buttonHover: '0 5px 25px 1px rgba(0, 0, 0, 0.28)',
    inset: 'inset 0 1px 3px 0 rgba(162, 162, 162, 0.5)',
  },
  focus: {
    native: [
      // https://css-tricks.com/copy-the-browsers-native-focus-styles/
      { outline: '5px auto Highlight' },
      { outline: '5px auto -webkit-focus-ring-color' },
    ],
  },
  zIndex: {
    above: 900,
  },
  props: {
    // We don't want a ripple effect on any of our
    //   controls.
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    // Hide the buttons for submitting
    //   the calendar, which we don't
    //   want.
    MuiPickersToolbar: {
      toolbar: {
        display: 'none',
      },
    },

    // Hide the calendar header and
    //   add some padding to make it
    //   look a bit nicer.
    MuiPickersModal: {
      dialog: {
        minHeight: 'auto',

        '& + div': {
          display: 'none',
        },
      },
      dialogRoot: {
        padding: 10,
        minHeight: 'auto',
      },
    },

    // Fix the background of the month
    //   switcher arrows so the next
    //   month isn't displayed behind
    //   them.
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: '#fff',

        '&:hover': {
          backgroundColor: '#eee',
        },

        '& > *': {
          backgroundColor: 'transparent',
        },
      },
    },

    // Adjust colors to our theme.
    MuiPickersDay: {
      current: {
        color: textboxFocus,
      },
      isSelected: {
        backgroundColor: textboxFocus,
      },
    },

    // This helps when adding an icon to a title that
    //   needs to be outdented from the main text.
    MuiTypography: {
      root: {
        position: 'relative',
      },
    },

    // These rules prevent our input fields from having
    //   a hover effect.
    MuiOutlinedInput: {
      root: {
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: textboxBorder,

          '@media (hover: none)': {
            borderColor: textboxBorder,
          },
        },
      },
    },
  },
});

// Add in breakpoint helpers by device type. It is easier
//   to figure out what is going on when using these names.
theme.breakpoints.phone = theme.breakpoints.down('xs');
theme.breakpoints.tablet = theme.breakpoints.down('sm');
theme.breakpoints.notPhone = theme.breakpoints.up('sm');
theme.breakpoints.desktop = theme.breakpoints.up('md');

// This must be done after the breakpoint helpers are
//   set because they are used in the method.
theme.typography = addTypography(theme);

// TODO: The textbox from willing-shared uses these custom
//   theme elements, but we don't want to use them in WUI,
//   so remove them once the transition to WUI is complete.
theme.layout = theme.layout || {};
theme.layout.formField = {};
theme.layout.disabledNode = {};
theme.layout.formFieldHelperText = {};
theme.layout.inputHeight = 55;

// TODO: This is needed for the PurePersonChooser, but
//   should be removed when WUI transition is complete.
theme.palette.highlighted = {};

// TODO: This is needed for TwoColumnContent, but
//   should be removed when WUI transition is complete.
theme.palette.custom = {
  border: panelBorder,
};
theme.layout.leftSideMobileGutter = 24;
theme.layout.side = {
  mdUp: 64,
  default: 24,
};
theme.layout.headerHeight = 80;
theme.layout.disabledNode = {
  opacity: 0.6,
  pointerEvents: 'none',
};
theme.layout.paperPadding = 32;

export const WuiThemeProvider = props => {
  const generateClassName = useRef(
    createGenerateClassName({
      productionPrefix: 'wui-jss',
    }),
  );
  return (
    <StylesProvider
      generateClassName={generateClassName.current}
      serverGenerateClassName={generateClassName.current}
    >
      <ThemeProvider {...props} theme={theme} />
    </StylesProvider>
  );
};

const generateClassName = createGenerateClassName({
  productionPrefix: 'wui-jss',
});

export const StaticWuiThemeProvider = props => (
  <StylesProvider generateClassName={generateClassName} serverGenerateClassName={generateClassName}>
    <ThemeProvider {...props} theme={theme} />
  </StylesProvider>
);

export default theme;
