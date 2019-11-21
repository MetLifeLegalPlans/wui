import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormGroup from '@material-ui/core/FormGroup';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckboxCheckedActiveUrl from '@a/images/checkbox-checked-active.svg';
import CheckboxUncheckedActiveUrl from '@a/images/checkbox-unchecked-active.svg';
import CheckboxChecked from '@a/images/checkbox-checked.svg';
import CheckboxUnchecked from '@a/images/checkbox-unchecked.svg';

const muiCheckboxStyles = {
  root: {
    padding: 0,
    marginLeft: 14,
    marginRight: 12,
  },
};

const labelStyles = theme => ({
  root: {
    // The fill color of the checkmark is set using
    //   CSS so it can be controlled when in the
    //   disabled state.
    '& g': {
      fill: theme.palette.blue.checkboxCheck,
    },
  },
  label: {
    fontSize: 16,
    lineHeight: '24px',
    color: theme.palette.grey.inputText,
  },
  disabled: {
    '& g': {
      fill: theme.palette.grey.disabledButtonBorder,
    },
  },
});

const StyledCheckbox = withStyles(muiCheckboxStyles)(MuiCheckbox);
const StyledFormControlLabel = withStyles(labelStyles)(FormControlLabel);

const checkboxStyles = {
  // Used to modify other classes.
  checked: {},

  rippleRoot: {
    top: -5,
    left: -4,
    right: -4,
    bottom: -5,
    width: 'auto',
    height: 'auto',
    borderRadius: 0,
  },
  child: {
    borderRadius: 0,
    animation: 'none',
    background: `url(${CheckboxUncheckedActiveUrl})`,

    '$checked &': {
      background: `url(${CheckboxCheckedActiveUrl})`,
    },
  },
  rippleVisible: {
    opacity: 1,
    animation: 'none',
  },
};

class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.node,
    onChange: PropTypes.func,
    /** @ignore */
    classes: PropTypes.shape({}).isRequired,

    /** `className` prop for the label */
    formControlLabelClass: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };

  static defaultProps = {
    label: '',
    checked: false,
    formControlLabelClass: '',
    onChange: () => {},
  };

  constructor(...args) {
    super(...args);

    const { checked } = this.props;
    this.state = { checked };
  }

  handleChange = (event, checked) => {
    const { onChange } = this.props;

    this.setState({ checked });
    onChange(event, checked);
  };

  render() {
    const {
      label,
      formControlLabelClass,
      classes: { child, rippleRoot, rippleVisible, checked: checkedClass, ...classes },
      ...checkboxProps
    } = this.props;

    const { checked } = this.state;

    const rippleRootClassName = classNames(rippleRoot, {
      [checkedClass]: checked,
    });

    const checkbox = (
      <StyledCheckbox
        checked={checked}
        classes={classes}
        disableTouchRipple
        disableRipple={false}
        icon={<CheckboxUnchecked />}
        onChange={this.handleChange}
        checkedIcon={<CheckboxChecked />}
        TouchRippleProps={{
          classes: {
            child,
            rippleVisible,
            root: rippleRootClassName,
          },
        }}
        {...checkboxProps}
      />
    );

    return (
      <FormGroup>
        <StyledFormControlLabel
          label={label}
          className={formControlLabelClass}
          control={checkbox}
        />
      </FormGroup>
    );
  }
}

export default withStyles(checkboxStyles)(Checkbox);
