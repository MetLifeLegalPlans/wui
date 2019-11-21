import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  middlePosition: {},

  root: {
    top: 0,
    right: 0,
    fontSize: 30,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    lineHeight: '5px',
    background: 'none',
    padding: [[20, 20, 26]],
    position: 'absolute',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,

    '&$middlePosition': {
      bottom: 0,
    },
  },
}));

/**
 * A styled close button for use in modals. Does not manage state by itself.
 */
const CloseButton = ({ onClick, position }) => {
  const classes = useStyles();
  const className = classNames(classes.root, classes[`${position}Position`]);

  return (
    <button type="button" onClick={onClick} className={className}>
      &#x2715;
    </button>
  );
};

CloseButton.propTypes = {
  /** The function to run when this button is clicked */
  onClick: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['top', 'middle']),
};

CloseButton.defaultProps = {
  position: 'middle',
};

export default CloseButton;
