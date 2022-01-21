import React from 'react';
import PropTypes from 'prop-types';

import TextLink from '@/basics/link';
import DropdownMenu, { optionShape } from '@/layout/dropdownMenu';

class Dropdown extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    renderButton: PropTypes.func,
    label: PropTypes.node,
    options: PropTypes.arrayOf(optionShape).isRequired,
  };

  static defaultProps = {
    disabled: false,
    renderButton: null,
    label: null,
  };

  state = {
    anchorElement: null,
  };

  onClickLink = event => {
    event.preventDefault();

    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.setState({ anchorElement: event.currentTarget });
  };

  onClickOption = option => event => {
    event.preventDefault();

    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.onClose();
    option.onClick(option);
  };

  onClose = () => {
    this.setState({ anchorElement: null });
  };

  wrapOptionClickHandler = option => {
    if (option.onClick) {
      return {
        ...option,
        onClick: this.onClickOption(option),
      };
    }

    return option;
  };

  render() {
    const { anchorElement } = this.state;
    const { label, options, renderButton } = this.props;

    if (options.length === 1) {
      return (
        <TextLink href="#" color="inherit" onClick={this.onClickOption(options[0])}>
          {options[0].label}
        </TextLink>
      );
    }

    const underlineProps = typeof label === 'string' ? {} : { underline: 'none' };

    return (
      <React.Fragment>
        {renderButton ? (
          renderButton({ onClick: this.onClickLink, open: Boolean(anchorElement) })
        ) : (
          <TextLink
            aria-haspopup="true"
            aria-expanded={anchorElement ? 'true' : undefined}
            href="#"
            color="inherit"
            {...underlineProps}
            onClick={this.onClickLink}
          >
            {label}
          </TextLink>
        )}

        <DropdownMenu
          onClose={this.onClose}
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          options={options.map(this.wrapOptionClickHandler)}
        />
      </React.Fragment>
    );
  }
}

export default Dropdown;
