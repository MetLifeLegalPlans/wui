import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MuiTooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';

const tooltipStyles = theme => ({
  ...theme.typography.caption,
  padding: [[4, 16]],
  borderRadius: 15,
  color: theme.palette.grey.lightBackground,
  backgroundColor: theme.palette.text.primary,
});

const useStyles = makeStyles(theme => ({
  tooltip: tooltipStyles(theme),
  touch: tooltipStyles(theme),
}));

const Tooltip = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <MuiTooltip classes={classes} enterTouchDelay={500} {...props}>
      {children}
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
};

Tooltip.defaultProps = {
  children: <HelpOutline />,
};

export default Tooltip;
