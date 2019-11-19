import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  // Used to modify dot animation delays.
  d1: {},
  d2: {},

  spinner: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',

    '& > span': {
      width: '1em',
      height: '1em',
      borderRadius: '100%',
      display: 'inline-flex',
      animation: '$bounce-delay 1.4s infinite ease-in-out both',
      marginRight: 4,

      '&$d1': {
        animationDelay: '-0.32s',
      },

      '&$d2': {
        animationDelay: '-0.16s',
      },
    },
  },
  '@keyframes bounce-delay': {
    '0%, 80%, 100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1)',
    },
  },
};

class Spinner extends React.PureComponent {
  static propTypes = {
    color: PropTypes.func,
    background: PropTypes.func,
    theme: PropTypes.shape({}).isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    color: () => 'currentColor',
    background: () => 'transparent',
  };

  render() {
    const {
      theme,
      classes,
      color: colorFunc,
      background: backgroundFunc,
      ...remainingProps
    } = this.props;

    const { className: externalClassName, ...props } = remainingProps;

    const className = classNames(classes.spinner, externalClassName);

    const dotStyle = { background: colorFunc(theme) };
    const wrapperStyle = { background: backgroundFunc(theme) };

    return (
      <span style={wrapperStyle} className={className} {...props}>
        <span style={dotStyle} className={classes.d1} />
        <span style={dotStyle} className={classes.d2} />
        <span style={dotStyle} />
      </span>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Spinner);
