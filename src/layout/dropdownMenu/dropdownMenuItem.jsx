import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const hoverStyle = theme => ({
  borderRadius: theme.dimensions.borderRadius,
  background: theme.palette.background.default,
});

export const styles = theme => ({
  root: {
    fontSize: 18,
    minWidth: 100,
    height: 'auto',
    lineHeight: '28px',
    padding: [[7, 20]],
    color: theme.palette.text.secondary,

    '&:hover, &:active': hoverStyle(theme),
  },
  menuItemFocusVisible: hoverStyle(theme),
});

const DropdownMenuItem = React.forwardRef(({ classes, label, selected, ...rest }, ref) => {
  const { menuItemFocusVisible, ...itemClasses } = classes;
  const className = classNames({
    [classes.menuItemFocusVisible]: selected,
  });

  return (
    <MenuItem
      key={label}
      classes={itemClasses}
      focusVisibleClassName={menuItemFocusVisible}
      className={className}
      {...rest}
      ref={ref}
    >
      {label}
    </MenuItem>
  );
});

DropdownMenuItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,

  // Used for manual highlighting with downshift or a manually generated menu
  selected: PropTypes.bool,
};

DropdownMenuItem.defaultProps = {
  selected: false,
};

export default withStyles(styles)(DropdownMenuItem);
