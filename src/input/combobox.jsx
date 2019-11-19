import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import DropdownMenu, { optionShape } from '@/layout/dropdownMenu';
import Textbox from './textbox';

const Combobox = ({
  // Logic for filtering/selecting options held in the parent component
  getOptionsByInputValue,

  // Action to perform when downshift input field has lost focus
  onFocusOut,

  // The currently selected option, if any
  selected,

  // Custom logic used to select an item
  onSelect,

  // Whether or not to show the textfield in an error state
  error,

  // Modifiers for the text field
  label,
  helperText,
  onBlur,
  onFocus,

  // Unfocus the text field after selecting something
  blurOnSelect,

  // Used for capitalizing names or other input mutation
  mutateInputValue,

  TextFieldComponent,
  dataPathOverride,
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(selected ? selected.label : '');

  const options = getOptionsByInputValue(inputValue);

  // Make sure the displayed value always updates when the selected one does
  useEffect(() => {
    setInputValue(selected ? selected.label : '');
  }, [selected]);

  const select = (...args) => {
    if (blurOnSelect) {
      inputRef.current.blur();
    }

    onSelect(...args);
  };

  // This is a render prop, which seems to be confusing our linter
  /* eslint-disable react/prop-types */
  const renderDownshift = ({
    // Required from Downshift to make the selector work
    getInputProps,
    getMenuProps,
    getItemProps,

    // Menu item props to maintain highlighted state
    highlightedIndex,

    // Manual control of menu opening as we may not have options to show
    isOpen,
    openMenu,
    closeMenu,
  }) => {
    const onChange = e => {
      const {
        target: { value },
      } = e;
      setInputValue(mutateInputValue(value));

      if (!value) {
        onSelect(null);
      }
    };

    const focusInput = e => {
      onFocus(e);
      openMenu(e);
    };

    const blurInput = e => {
      closeMenu(e);
      onBlur(e);
      onFocusOut(inputValue);
    };

    const inputPropsModifier = inputProps => ({
      ...inputProps,
      ...getInputProps({
        onChange,
        type: 'text',
        onBlur: blurInput,
        onFocus: focusInput,
      }),
      value: inputValue,
    });

    const menuOptions = options.map((option, idx) =>
      getItemProps({
        ...option,
        item: option,
        selected: highlightedIndex === idx,
      }),
    );

    return (
      <div>
        <TextFieldComponent
          error={error}
          label={label}
          value={inputValue}
          dataPathOverride={dataPathOverride}
          inputPropsModifier={inputPropsModifier}
          helperText={helperText}
          inputRef={inputRef}
        />

        {isOpen && (
          <DropdownMenu
            {...getMenuProps({
              onSelect: select,
              options: menuOptions,
              open: isOpen && Boolean(options.length),
              onClose: closeMenu,
              anchorEl: inputRef.current,
              disableAutoFocusItem: true,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              disableAutoFocus: true,
              disableRestoreFocus: true,
              keepMounted: true,
              refKey: 'listRef',
            })}
          />
        )}
      </div>
    );
  };
  /* eslint-enable react/prop-types */

  return (
    <Downshift
      onSelect={item => select(item.value || item.label)}
      itemToString={item => (item ? item.label : '')}
      defaultHighlightedIndex={0}
    >
      {renderDownshift}
    </Downshift>
  );
};

Combobox.propTypes = {
  getOptionsByInputValue: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func,
  selected: PropTypes.shape({ optionShape }),
  onSelect: PropTypes.func,
  error: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  blurOnSelect: PropTypes.bool,
  mutateInputValue: PropTypes.func,
  TextFieldComponent: PropTypes.elementType,
  dataPathOverride: PropTypes.string,
};

Combobox.defaultProps = {
  onFocusOut: () => null,
  selected: { label: '', value: '' },
  onSelect: () => null,
  error: false,
  label: '',
  helperText: '',
  onBlur: () => null,
  onFocus: () => null,
  blurOnSelect: true,
  mutateInputValue: val => val,
  TextFieldComponent: Textbox,
  dataPathOverride: '',
};

export default Combobox;
