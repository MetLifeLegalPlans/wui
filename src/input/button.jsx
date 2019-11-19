import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MuiButton from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

import Spinner from '@/basics/spinner';

const verticalPadding = 14;
const horizontalPadding = 32;
const largeVerticalPadding = 8;
const outlinedBorderWidth = 2;
const largeHorizontalPadding = 48;
const horizontalPaddingMobile = 16;
const smallVerticalPadding = 11;
const smallHorizontalPadding = 18;

const styles = theme => ({
  // Used to modify other rules.
  disabled: {},
  transparent: {},

  root: {
    fontSize: 16,
    minWidth: 192,
    boxShadow: 'none',
    lineHeight: '16px',
    letterSpacing: 0.5,
    position: 'relative',
    textTransform: 'none',
    borderRadius: theme.dimensions.borderRadius,

    [theme.breakpoints.phone]: {
      minWidth: 'auto',
    },

    '&$transparent': {
      backgroundColor: 'transparent',

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  text: {
    padding: 0,
    fontSize: 18,
    minWidth: 'auto',
    lineHeight: '28px',
    color: theme.palette.text.secondary,

    '&:hover, &:focus': {
      background: 'none',
      textDecoration: 'underline',
    },
  },
  contained: {
    fontWeight: 600,
    letterSpacing: 0.89,
    background: theme.palette.blue.default,
    padding: [[verticalPadding, horizontalPadding]],

    [theme.breakpoints.phone]: {
      padding: [[verticalPadding, horizontalPaddingMobile]],
    },

    '&:hover': {
      background: theme.palette.blue.hover,
      boxShadow: theme.customShadows.buttonHover,
    },

    '&:focus': {
      boxShadow: 'none',
      background: theme.palette.blue.focus,
    },

    '&$disabled:hover, &$disabled': {
      color: theme.palette.common.white,
      background: theme.palette.blue.disabled,
    },
  },
  sizeLarge: {
    fontSize: 22,
    lineHeight: '32px',
    padding: [[largeVerticalPadding, largeHorizontalPadding]],
  },
  sizeSmall: {
    fontSize: 14,
    lineHeight: '22px',
  },
  outlined: {
    background: theme.palette.common.white,
    border: [[outlinedBorderWidth, 'solid', theme.palette.grey.panelBorder]],
    padding: [[verticalPadding - outlinedBorderWidth, horizontalPadding - outlinedBorderWidth]],

    [theme.breakpoints.phone]: {
      padding: [
        [verticalPadding - outlinedBorderWidth, horizontalPaddingMobile - outlinedBorderWidth],
      ],
    },

    '&:hover': {
      background: theme.palette.common.white,
      boxShadow: theme.customShadows.buttonHover,
    },

    '&:focus': {
      borderColor: theme.palette.blue.default,
      background: theme.palette.background.default,
    },

    '&$disabled:hover, &$disabled': {
      color: theme.palette.text.disabled,
      borderColor: theme.palette.grey.disabledButtonBorder,
    },

    '&$sizeLarge': {
      padding: [
        [largeVerticalPadding - outlinedBorderWidth, largeHorizontalPadding - outlinedBorderWidth],
      ],
    },

    '&$sizeSmall': {
      padding: [
        [smallVerticalPadding - outlinedBorderWidth, smallHorizontalPadding - outlinedBorderWidth],
      ],
    },
  },
  noMinWidth: {
    minWidth: 'auto',
  },
  labelWrapper: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  processing: {
    '& $labelWrapper': {
      opacity: 0,
    },
  },
  spinner: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },

  pulse: {
    animation: '$pulse 3s infinite ease-in-out',
  },

  '@keyframes pulse': {
    '50%': {
      boxShadow: theme.customShadows.buttonHover,
    },
  },
});

class Button extends React.PureComponent {
  static propTypes = {
    processing: PropTypes.bool,
    noMinWidth: PropTypes.bool,
    width: PropTypes.string.isRequired,
    classes: PropTypes.shape({}).isRequired,
    fullWidth: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    transparent: PropTypes.bool,
    pulse: PropTypes.bool,
  };

  static defaultProps = {
    fullWidth: false,
    processing: false,
    noMinWidth: false,
    transparent: false,
    pulse: false,
  };

  render() {
    const {
      width,
      fullWidth,
      noMinWidth,
      processing,
      transparent,
      classes: {
        labelWrapper,
        spinner: spinnerClass,
        noMinWidth: noMinWidthClass,
        processing: processingClass,
        transparent: transparentClass,
        pulse: pulseClass,
        ...buttonClasses
      },
      pulse,
      ...rest
    } = this.props;

    const {
      children: externalChildren,
      disabled: externalDisabled,
      className: externalClassName,
      ...buttonProps
    } = rest;

    const disabled = externalDisabled || processing;

    let actualFullWidth = fullWidth;
    if (typeof fullWidth === 'function') {
      actualFullWidth = fullWidth(width);
    }

    const className = classNames(externalClassName, {
      [processingClass]: processing,
      [noMinWidthClass]: noMinWidth,
      [transparentClass]: transparent,
      [pulseClass]: pulse,
    });

    return (
      <MuiButton
        {...buttonProps}
        disabled={disabled}
        className={className}
        classes={buttonClasses}
        fullWidth={actualFullWidth}
      >
        {processing && <Spinner className={spinnerClass} />}

        <span className={labelWrapper}>{externalChildren}</span>
      </MuiButton>
    );
  }
}

export default withStyles(styles)(withWidth()(Button));
