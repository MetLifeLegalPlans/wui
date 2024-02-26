import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTextField from '@material-ui/core/TextField';
import { capitalize } from '@/utils';

const inputFontSize = 18;
export const topMargin = 16;

// When the label is on top of the border surrounding
//   the text box, it is scaled by 0.75. We want the
//   resulting font size to be 14 as displayed, so
//   we do some math.
const labelFontSize = 14 / 0.75;

const useStyles = makeStyles(theme => ({
  noAutofill: {
    // Prevent browser autocomplete from changing the
    //   background color of the field.
    '&:-webkit-autofill, &:-webkit-autofill:focus': {
      backgroundColor: [['#fff'], '!important'],
      color: [[theme.palette.text.primary], '!important'],
      boxShadow: [['0 0 0 300px #fff inset'], '!important'],
      WebkitBoxShadow: [['0 0 0 300px #fff inset'], '!important'],
      WebkitTextFillColor: [[theme.palette.text.primary], '!important'],
    },
  },
  icon: {
    marginRight: 8,
  },

  // These are used to modify other styles.
  filled: {},
  focused: {},
  disabled: {},
  focusedLabel: {},
  notchedOutline: {},

  root: {
    margin: [[topMargin, 0, 0]],

    '& $notchedOutline': {
      border: [[1.5, 'solid', theme.palette.grey.textboxBorder]],
    },

    '&$disabled $notchedOutline': {
      borderColor: theme.palette.grey.panelBorder,
    },
  },
  label: {
    lineHeight: '20px',
    letterSpacing: 0.43,
    fontSize: labelFontSize,

    '$disabled &': {
      color: theme.palette.grey.placeholderText,
    },

    '&$focusedLabel': {
      color: theme.palette.text.primary,
    },

    '&:not($focusedLabel):not($filled)': {
      // When the label is over the textbox (not over the
      //   border surrounding it), it is scaled up so that
      //   it is the right size. We need to do this so that
      //   the border is notched properly when the label is
      //   shrunk during focus.
      transform: `translate(14px, 14px) scale(${inputFontSize / labelFontSize})`,
    },
  },
  placeholder: {
    lineHeight: '26px',
    letterSpacing: 0.56,
    color: theme.palette.grey.inputText,

    '$disabled &': {
      color: theme.palette.grey.placeholderText,
    },
  },
  inputRoot: {
    '&$focused $notchedOutline': {
      borderColor: theme.palette.blue.textboxFocus,
      fallbacks: theme.focus.native,
      outlineOffset: 4,
    },
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
  },
  selectRoot: {
    '&:focus': {
      background: 'transparent',
    },
  },
  input: {
    lineHeight: '23px',
    letterSpacing: 0.56,
    fontSize: inputFontSize,

    '&:not($placeholder)': {
      color: theme.palette.text.primary,
    },

    '$disabled &': {
      color: theme.palette.grey.placeholderText,
    },
  },
  helperText: {
    fontSize: 14,
    minHeight: 18,
    lineHeight: '18px',
    margin: [[3, 8, 0]],

    '$disabled &': {
      color: theme.palette.grey.placeholderText,
    },
  },
  blankOption: {
    fontStyle: 'normal',
  },
  blankOptionNoFocus: {
    '&:not(:focus)': {
      fontStyle: 'normal',
      color: theme.palette.grey.inputText,

      '$disabled &': {
        color: theme.palette.grey.placeholderText,
      },
    },
  },
}));

const makeDotRowModifier = modifier => props => {
  const modified = modifier(props);

  return {
    ...modified,
    className: classNames(props.className, 'dot-row-aligner'),
  };
};

const Textbox = ({
  name,
  rows,
  type,
  error,
  label,
  value,
  options,
  optional,
  disabled,
  inputRef,
  autoFocus,
  multiline,
  helperText,
  autoComplete,
  dataPathOverride,
  inputPropsModifier,
  SelectPropsModifier,
  hidePlaceholderOnFocus,
  hideEmptyOption,
  onBlur: propOnBlur,
  onChange: propOnChange,
  ...rest
}) => {
  const classes = useStyles();

  const {
    style,
    onClick,
    InputProps,
    className: externalClassName,
    FormHelperTextProps,
    ...textFieldProps
  } = rest;
  const isSelect = Object.keys(options).length > 0;

  const renderSelectOptions = () => {
    const items = Object.entries(options).map(([ivalue, display]) => (
      <option value={ivalue} key={ivalue}>
        {capitalize(display)}
      </option>
    ));

    if (!hideEmptyOption) {
      items.unshift(
        <option value="" key="" className={classes.blankOption}>
          {label}
        </option>,
      );
    }

    return items;
  };

  const inputLabelProps = {
    classes: {
      root: classes.label,
      focused: classes.focusedLabel,
    },
    className: classNames({
      [classes.placeholder]: !isSelect,

      // A select is always considered filled because
      //   there is no placeholder and always some
      //   kind of value being shown.
      [classes.filled]: isSelect || value,
    }),
    ...(isSelect ? { shrink: true } : {}),
  };

  const className = classNames(
    classes.root,
    externalClassName,
    {
      [classes.disabled]: disabled,
    },
    'dot-row-specific',
  );

  const selectEmpty = isSelect && value === '';
  const inputClassName = classNames(classes.noAutofill, {
    [classes.blankOptionNoFocus]: selectEmpty,
    [classes.placeholder]: selectEmpty,
  });

  // We need to extract the onBlur and onChange
  //   properties so we can modify them to have
  //   the expected behavior.
  const unfilteredInputProps = makeDotRowModifier(inputPropsModifier)({
    name,
    onClick,
    disabled,
    'data-value': value,
    className: inputClassName,
    'data-path': dataPathOverride || name,
  });

  // The props for the component might have custom event handler
  //   settings, so we need to run those as well as whatever might
  //   be returned from the inputPropsModifier.
  const { onBlur, onFocus, onChange, ...inputProps } = unfilteredInputProps;

  const boundOnBlur = e => {
    if (onBlur) {
      onBlur(e);
    }

    propOnBlur(e);

    // Reset the placeholder if it was removed
    //   by `hidePlaceholderOnFocus`.
    e.target.placeholder = label;
  };

  const boundOnChange = e => {
    if (onChange) {
      onChange(e);
    }

    propOnChange(e);
  };

  const boundOnFocus = e => {
    if (onFocus) {
      onFocus(e);
    }

    if (hidePlaceholderOnFocus) {
      e.target.placeholder = '';
    }
  };

  const { inputProps: InputPropsInputProps = {}, ...remainingInputProps } = InputProps || {};

  const combinedInputProps = {
    'aria-label': label,
    'aria-required': String(!optional),
    ...InputPropsInputProps,
    ...inputProps,
  };

  return (
    <MaterialTextField
      SelectProps={makeDotRowModifier(SelectPropsModifier)({
        native: true,
        className: classes.noAutofill,
        classes: {
          icon: classes.icon,
          select: classes.selectRoot,
        },
      })}
      InputProps={{
        ...remainingInputProps,
        inputProps: combinedInputProps,

        classes: {
          input: classes.input,
          root: classes.inputRoot,
          focused: classes.focused,
          notchedOutline: classes.notchedOutline,
        },
        required: !optional,
      }}
      id={label}
      fullWidth
      rows={rows}
      name={name}
      label={label}
      style={style}
      value={value}
      margin="normal"
      select={isSelect}
      variant="outlined"
      disabled={disabled}
      inputRef={inputRef}
      placeholder={label}
      onBlur={boundOnBlur}
      autoFocus={autoFocus}
      className={className}
      multiline={multiline}
      type={type || 'text'}
      onFocus={boundOnFocus}
      onChange={boundOnChange}
      autoComplete={autoComplete}
      InputLabelProps={inputLabelProps}
      error={Boolean(error)}
      FormHelperTextProps={{
        className: classes.helperText,
        'aria-live': 'assertive',
        ...FormHelperTextProps,
      }}
      helperText={error === true ? ' ' : error || helperText || ' '}
      {...textFieldProps}
    >
      {renderSelectOptions()}
    </MaterialTextField>
  );
};

Textbox.propTypes = {
  /** Standard input property */
  rows: PropTypes.string,

  /** Standard input property */
  name: PropTypes.string,

  /** Standard input property */
  onBlur: PropTypes.func,

  /** Standard input property */
  value: PropTypes.string,

  /** Standard input property */
  disabled: PropTypes.bool,

  /** Standard input property */
  onChange: PropTypes.func,

  /** Standard input property */
  autoFocus: PropTypes.bool,

  /** Standard input property */
  multiline: PropTypes.bool,

  /** Standard input property */
  autoComplete: PropTypes.string,

  /** Input type to use for the text field (if not a select field). */
  type: PropTypes.string,

  /** An object that provides options for the field
     instead of those dictated by the field type.
     Each key is the value submitted by the form
     and each value is what is displayed to the
     user. */
  options: PropTypes.shape({}),

  /** If options are being displayed, whether or not
     to show an empty value in addition to the
     valid values. */
  hideEmptyOption: PropTypes.bool,

  /** If optional is false, the field is marked as required */
  optional: PropTypes.bool,

  /** A value to use for the input element's
     `data-path` property. If unset, the
     path for the component is used. */
  dataPathOverride: PropTypes.string,

  /** Function that accepts an object with
     properties for the input tag and returns an object that should
     be used for those properties. */
  inputPropsModifier: PropTypes.func,

  /** Function that accepts an object with
     properties for the select tag and returns an object that should
     be used for those properties. */
  SelectPropsModifier: PropTypes.func,

  /** The text that should be displayed as
     an error instead of the placeholder.
     If a boolean is supplied, indicates
     whether or not the border color
     changes without displaying an error. */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** The label to display indicating what the field is for. */
  label: PropTypes.string,

  /** Text that indicates to the user what the field is used for. */
  helperText: PropTypes.string,

  /** Either a callback ref function or a ref object from the useRef hook */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),

  /** Whether or not to show the placeholder
     text in the textbox when the field
     is focused. */
  hidePlaceholderOnFocus: PropTypes.bool,
};

Textbox.defaultProps = {
  name: null,
  rows: null,
  error: null,
  label: null,
  value: null,
  options: {},
  optional: false,
  type: 'text',
  disabled: false,
  autoFocus: false,
  helperText: null,
  multiline: false,
  onBlur: () => {},
  onChange: () => {},
  inputRef: () => {},
  autoComplete: null,
  dataPathOverride: null,
  hideEmptyOption: false,
  hidePlaceholderOnFocus: false,
  inputPropsModifier: props => props,
  SelectPropsModifier: props => props,
};

export default Textbox;
