import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const noticeStyles = theme => ({
  empty: {},
  special: {},
  primary: {},

  notice: {
    background: theme.palette.blue.noticeBackground,
    color: 'black',
    textTransform: 'uppercase',
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderTopRightRadius: theme.dimensions.borderRadius,
    minHeight: 8,
    fontFamily: theme.typography.fontFamily,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '14px',
    textAlign: 'left',
    padding: '4px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '4px 24px',
    },

    '&$special': {
      background: theme.gradients.special,
      color: 'white',
      fontSize: 14,
      fontWeight: 600,
    },

    '&$primary': {
      backgroundColor: theme.palette.blue.textboxFocus,
      color: 'white',
      fontSize: 14,
      fontWeight: 600,
    },

    '&$empty': {
      backgroundColor: theme.palette.grey.disabledButtonBorder,
    },
  },
});

const Notice = ({ classes, children, special, primary }) => {
  const noticeClasses = classNames(classes.notice, {
    [classes.empty]: !children,
    [classes.special]: special,
    [classes.primary]: primary,
  });

  return <div className={noticeClasses}>{children}</div>;
};

Notice.propTypes = {
  /** @ignore */
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node,

  /** Turns it green */
  special: PropTypes.bool,

  /** Turns it blue */
  primary: PropTypes.bool,
};

Notice.defaultProps = {
  special: false,
  children: null,
  primary: false,
};

export default withStyles(noticeStyles)(Notice);
