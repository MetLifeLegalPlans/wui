import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const Layer = 'div';
export const borderWidth = 1;
const SPECIAL_FORCE = 'force';
const specialIndicatorWidth = 8;

export function panelDimensions(theme, attribute, modifier, styles, lessOnly = false) {
  const output = styles;

  const normal = {
    phone: [modifier(16, 24)],
    tablet: [modifier(24, 48)],
    desktop: [modifier(24, 64)],
  };
  const less = {
    phone: [modifier(16, 16)],
    tablet: [modifier(24, 24)],
    desktop: [modifier(24, 24)],
  };
  const more = {
    phone: [modifier(48, 24)],
    tablet: [modifier(96, 96)],
    desktop: [modifier(96, 96)],
  };

  function addDimensions(className, dimensions) {
    if (className) {
      output[`&$${className}`] = output[`&$${className}`] || {};
    }
    const update = className ? output[`&$${className}`] : output;

    update[attribute] = dimensions.desktop;

    update[theme.breakpoints.tablet] = update[theme.breakpoints.tablet] || {};
    update[theme.breakpoints.tablet][attribute] = dimensions.tablet;

    update[theme.breakpoints.phone] = update[theme.breakpoints.phone] || {};
    update[theme.breakpoints.phone][attribute] = dimensions.phone;
  }

  if (lessOnly) {
    addDimensions(null, less);
  } else {
    addDimensions(null, normal);
    addDimensions('lessPadding', less);
    addDimensions('morePadding', more);
  }

  return output;
}

const styles = theme => ({
  // These are used to modify other classes.
  borderless: {},
  paddingless: {},
  lessPadding: {},
  morePadding: {},
  specialForce: {},
  alternateIndicator: {},
  extraVerticalPadding: {},
  tableRow: {},
  noMargin: {},
  round: {},
  tooltip: {},

  root: panelDimensions(theme, 'padding', (...args) => args, {
    boxShadow: 'none',
    position: 'relative',
    borderRadius: theme.dimensions.borderRadius,
    border: [[borderWidth, 'solid', theme.palette.grey.panelBorder]],

    '&$borderless': {
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },

    '&$paddingless': {
      padding: 0,
    },

    '&$noMargin': {
      margin: 0,
    },

    '&$extraVerticalPadding': {
      paddingTop: 64,
      paddingBottom: 64,

      [theme.breakpoints.phone]: {
        paddingTop: 48,
      },
    },

    '& + &': {
      marginTop: theme.dimensions.panelSpacing.default,

      [theme.breakpoints.phone]: {
        marginTop: theme.dimensions.panelSpacing.phone,
      },

      '&$noMargin': {
        margin: 0,
      },
    },

    '&$round': {
      borderRadius: theme.dimensions.borderRadiusLarge,
    },

    '&$tooltip': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      boxShadow: theme.customShadows.standard,
    },

    '&$tableRow': {
      borderRadius: [[theme.dimensions.borderRadius, theme.dimensions.borderRadius, 0, 0]],

      '& + &': {
        '&$special': {
          marginTop: -1,
        },

        '&:not($special)': {
          margin: 0,
          borderTop: 'none',
        },
      },

      '& + &:not(:last-child)': {
        borderRadius: 0,
      },

      '&:last-child': {
        borderRadius: [[0, 0, theme.dimensions.borderRadius, theme.dimensions.borderRadius]],
      },

      '&$special': {
        zIndex: theme.zIndex.above,
        boxShadow: theme.customShadows.fab,
        marginLeft: -specialIndicatorWidth,
        marginRight: -specialIndicatorWidth,

        '& $specialIndicator': {
          [theme.breakpoints.phone]: {
            display: 'block',
          },
        },
      },
    },
  }),
  dashed: {
    borderStyle: 'dashed',
  },
  special: {
    boxShadow: theme.customShadows.standard,
  },
  specialSpacer: {
    '$special &': {
      [theme.breakpoints.notPhone]: {
        paddingLeft: specialIndicatorWidth,
      },
    },

    '$specialForce &': {
      paddingLeft: specialIndicatorWidth,
    },

    '$tableRow$special &': {
      padding: [[0, specialIndicatorWidth]],
    },
  },
  active: {
    boxShadow: theme.customShadows.standard,
    borderColor: theme.palette.grey.panelBorder,
  },
  specialIndicator: {
    width: specialIndicatorWidth,
    top: -borderWidth,
    left: -borderWidth,
    position: 'absolute',
    bottom: -borderWidth,
    background: theme.gradients.special,
    borderColor: theme.palette.grey.panelBorder,
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderBottomLeftRadius: theme.dimensions.borderRadius,

    [theme.breakpoints.phone]: {
      display: 'none',
    },

    '$root$specialForce &': {
      [theme.breakpoints.phone]: {
        display: 'block',
      },
    },

    '&$alternateIndicator': {
      background: theme.palette.blue.active,
      borderRadius: 0,
    },
  },
  tooltipIndicator: {
    height: specialIndicatorWidth,
    left: -borderWidth,
    top: -borderWidth,
    right: -borderWidth,
    position: 'absolute',
    background: theme.gradients.special,
    borderColor: theme.palette.grey.panelBorder,
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderTopRightRadius: theme.dimensions.borderRadius,

    '&:before': {
      content: '" "',
      position: 'absolute',
      bottom: specialIndicatorWidth,
      right: 32,
      width: 0,
      height: 0,
      borderLeft: [[8, 'solid', 'transparent']],
      borderRight: [[8, 'solid', 'transparent']],
      borderBottom: [[6, 'solid', theme.palette.green.success]],
    },
  },
  disabled: {
    opacity: 0.6,
    pointerEvents: 'none',
  },
  noOverflow: {
    overflow: 'hidden',
  },
});

class Panel extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    dashed: PropTypes.bool,
    indicatorVariant: PropTypes.oneOf(['primary', 'alternate']),
    indicatorMovesContent: PropTypes.bool,
    disabled: PropTypes.bool,
    borderless: PropTypes.bool,
    noOverflow: PropTypes.bool,
    noMargin: PropTypes.bool,
    paddingless: PropTypes.bool,
    lessPadding: PropTypes.bool,
    morePadding: PropTypes.bool,
    round: PropTypes.bool,
    tooltip: PropTypes.bool,
    tableRow: PropTypes.bool,
    maxContentWidth: PropTypes.number,
    extraVerticalPadding: PropTypes.bool,
    classes: PropTypes.shape({}).isRequired,
    special: PropTypes.oneOf([false, true, SPECIAL_FORCE]),
  };

  static defaultProps = {
    active: false,
    dashed: false,
    special: false,
    indicatorVariant: 'primary',
    indicatorMovesContent: true,
    disabled: false,
    borderless: false,
    noOverflow: false,
    noMargin: false,
    paddingless: false,
    lessPadding: false,
    morePadding: false,
    round: false,
    tooltip: false,
    tableRow: false,
    maxContentWidth: 0,
    extraVerticalPadding: false,
  };

  render() {
    const {
      active,
      dashed,
      classes,
      special,
      indicatorVariant,
      indicatorMovesContent,
      disabled,
      borderless,
      noOverflow,
      noMargin,
      paddingless,
      lessPadding,
      morePadding,
      round,
      tooltip,
      tableRow,
      maxContentWidth,
      extraVerticalPadding,
      ...rest
    } = this.props;

    const {
      active: activeClass,
      dashed: dashedClass,
      special: specialClass,
      specialForce: specialForceClass,
      disabled: disabledClass,
      borderless: borderlessClass,
      noOverflow: noOverflowClass,
      noMargin: noMarginClass,
      paddingless: paddinglessClass,
      lessPadding: lessPaddingClass,
      morePadding: morePaddingClass,
      round: roundClass,
      tooltip: tooltipClass,
      tooltipIndicator: tooltipIndicatorClass,
      tableRow: tableRowClass,
      specialIndicator: specialIndicatorClass,
      alternateIndicator: alternateIndicatorClass,
      specialSpacer: specialSpacerClass,
      extraVerticalPadding: extraVerticalPaddingClass,
      ...paperClasses
    } = classes;

    const { className: externalClassName, children, ...paperProps } = rest;

    const className = classNames(externalClassName, {
      [activeClass]: active,
      [dashedClass]: dashed,
      [specialClass]: special,
      [disabledClass]: disabled,
      [borderlessClass]: borderless,
      [noOverflowClass]: noOverflow,
      [noMarginClass]: noMargin,
      [paddinglessClass]: paddingless,
      [lessPaddingClass]: lessPadding,
      [morePaddingClass]: morePadding,
      [roundClass]: round,
      [tooltipClass]: tooltip,
      [tableRowClass]: tableRow,
      [specialForceClass]: special === SPECIAL_FORCE,
      [extraVerticalPaddingClass]: extraVerticalPadding,
    });

    const Wrapper = Layer;
    const wrapperProps = {};

    if (maxContentWidth) {
      wrapperProps.style = {
        maxWidth: maxContentWidth,
      };
    }

    const indicatorClass = classNames({
      [specialIndicatorClass]: true,
      [alternateIndicatorClass]: indicatorVariant === 'alternate',
    });

    return (
      <Paper {...paperProps} className={className} classes={paperClasses}>
        {special && <div className={indicatorClass} />}
        {tooltip && <div className={tooltipIndicatorClass} />}

        <Wrapper {...wrapperProps} className={indicatorMovesContent ? specialSpacerClass : ''}>
          {children}
        </Wrapper>
      </Paper>
    );
  }
}

export default withStyles(styles)(Panel);
