import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';

const Spacer = ({ h: horizontal, v: vertical, inline, children, ...props }) => (
  <Hidden {...props}>
    <span
      style={{
        display: inline ? 'inline-flex' : 'flex',
        height: vertical,
        width: horizontal,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </span>
  </Hidden>
);

Spacer.propTypes = {
  h: PropTypes.number,
  v: PropTypes.number,
  inline: PropTypes.bool,
  children: PropTypes.node,
};

Spacer.defaultProps = {
  h: 0,
  v: 0,
  children: null,
  inline: false,
};

export default Spacer;
