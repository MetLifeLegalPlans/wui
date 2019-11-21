import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/styles';

import DropdownMenuItem from './dropdownMenuItem';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 10,
    marginTop: 2,
    borderRadius: 5,
    boxShadow: theme.customShadows.standard,
    border: [[1.5, 'solid', theme.palette.grey.panelBorder]],
  },
}));

export const optionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onClick: PropTypes.func,
});

const DropdownMenu = ({ options: externOptions, onSelect, listRef, ...props }) => {
  const classes = useStyles();

  // Allow for both a custom onClick option per function as well as
  //   a selection for a combobox
  const options = externOptions.map(option => ({
    ...option,
    onClick: event => {
      onSelect(option.value || option.label);

      if (option.onClick) {
        option.onClick(event);
      }
    },
  }));

  const { MenuListProps: externListProps, ...rest } = props;

  // Downshift expects the ref to be applied to the paper, not the popover
  const MenuListProps = {
    disablePadding: true,
    ...externListProps,
    ref: listRef,
    variant: 'menu',
  };

  return (
    <Menu
      elevation={0}
      marginThreshold={0}
      getContentAnchorEl={null}
      classes={classes}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      MenuListProps={MenuListProps}
      autoFocus={false}
      disableAutoFocusItem
      variant="menu"
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      {...rest}
    >
      {options.map(option => (
        <DropdownMenuItem key={option.label} onClick={onSelect} {...option} />
      ))}
    </Menu>
  );
};

DropdownMenu.propTypes = {
  /** `{label, value?, onClick?}` */
  options: PropTypes.arrayOf(optionShape),

  /** Forwarded to MUI MenuList */
  MenuListProps: PropTypes.shape({}),

  onSelect: PropTypes.func,

  /** Either a callback ref or result of the `useRef()` hook */
  listRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
};

DropdownMenu.defaultProps = {
  options: [],
  MenuListProps: {},
  onSelect: () => null,
  listRef: {},
};

export default DropdownMenu;
