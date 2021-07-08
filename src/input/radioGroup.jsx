import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@/basics/typography';
import Button from './button';

const defaultOptions = [
  [true, 'Yes'],
  [false, 'No'],
];

const radioStyles = theme => ({
  checked: {},
  disabled: {},

  root: {
    paddingTop: 2,
  },

  colorPrimary: {
    color: theme.palette.grey.selectedTab,

    '&$checked:not($disabled)': {
      color: theme.palette.blue.textboxFocus,
    },
  },
});

const StyledRadio = withStyles(radioStyles)(Radio);

const styles = theme => ({
  // Used to modify other classes.
  hasValue: {},

  root: {
    paddingBottom: 4,
  },

  dotRoot: {
    alignItems: 'flex-start',
  },

  dotDescription: {
    marginBottom: 24,
  },

  buttons: {
    marginTop: 4,
  },

  buttonOutlined: {
    '$hasValue &': {
      borderWidth: 1,
      boxShadow: theme.customShadows.inset,
      background: theme.palette.background.default,
    },
  },
});

class RadioGroup extends React.Component {
  static propTypes = {
    /** Show traditional dot-style instead of boxes */
    dots: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,

    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
    withDeselectedBackground: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    options: PropTypes.arrayOf(PropTypes.array),
    pulseFirstOption: PropTypes.bool,
  };

  static defaultProps = {
    dots: false,
    label: null,
    value: null,
    disabled: false,
    onChange: () => {},
    options: defaultOptions,
    withDeselectedBackground: true,
    pulseFirstOption: false,
  };

  get hasValue() {
    const { value } = this.props;
    return value !== null && value !== '';
  }

  selectValue = value => () => {
    const { onChange } = this.props;

    onChange(value);
  };

  dotsChanged = event => {
    this.selectValue(event.target.value)();
  };

  renderOption = ([value, displayText, description], pulse, rest) => {
    const { dots, classes, disabled, value: selectedValue, label: labelText } = this.props;
    const selected = value === selectedValue;

    if (dots) {
      const label = (
        <Typography variant="h6" color={disabled ? 'disabled' : 'initial'}>
          {displayText}
          {description && (
            <Typography
              className={classes.dotDescription}
              color={disabled ? 'disabled' : 'initial'}
            >
              {description}
            </Typography>
          )}
        </Typography>
      );

      const radio = (
        <StyledRadio
          {...rest}
          role="radio"
          aria-checked={selected}
          onChange={this.dotsChanged}
          data-value={value}
          color="primary"
          inputProps={{ title: labelText }}
        />
      );

      return (
        <FormControlLabel
          key={value}
          label={label}
          control={radio}
          disabled={disabled}
          value={String(value)}
          classes={{
            root: classes.dotRoot,
            label: classes.dotLabel,
          }}
        />
      );
    }

    const buttonStyle =
      selected && this.hasValue
        ? { variant: 'contained', color: 'primary' }
        : { variant: 'outlined' };

    const buttonClasses = {
      root: classes.buttonRoot,
      outlined: classes.buttonOutlined,
    };

    return (
      <Grid item key={value}>
        <Button
          aria-label={`${labelText} ${displayText}`}
          role="radio"
          aria-checked={selected ? 'true' : 'false'}
          {...rest}
          noMinWidth
          {...buttonStyle}
          disabled={disabled}
          classes={buttonClasses}
          onClick={this.selectValue(value)}
          data-value={value}
          pulse={pulse}
        >
          {displayText}
        </Button>
      </Grid>
    );
  };

  render() {
    const {
      dots,
      label,
      value,
      classes,
      options,
      withDeselectedBackground,
      pulseFirstOption,
      ...rest
    } = this.props;

    const { className: externalClassName, ...optionProps } = rest;

    const renderedOptions = options.map((opt, idx) =>
      this.renderOption(opt, pulseFirstOption && !idx, optionProps),
    );

    if (dots) {
      return (
        <MuiRadioGroup
          role="radiogroup"
          aria-labelledby={label}
          value={String(value)}
          onChange={this.dotsChanged}
        >
          {renderedOptions}
        </MuiRadioGroup>
      );
    }

    const className = classNames(
      classes.root,
      {
        [classes.hasValue]: this.hasValue && withDeselectedBackground,
      },
      externalClassName,
    );

    return (
      <div role="radiogroup" aria-labelledby={label} className={className}>
        {label && (
          <Typography id={label} variant="intro">
            {label}
          </Typography>
        )}

        <Grid container spacing={2} className={classes.buttons}>
          {renderedOptions}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RadioGroup);
