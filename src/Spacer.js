import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ h: horizontal, v: vertical, inline }) => (
  <span
    style={{
      display: inline ? 'inline-flex' : 'flex',
      height: vertical,
      width: horizontal,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />
);

Spacer.propTypes = {
  h: PropTypes.number,
  v: PropTypes.number,
  inline: PropTypes.bool,
};

Spacer.defaultProps = {
  h: 0,
  v: 0,
  inline: false,
};

export default Spacer;
