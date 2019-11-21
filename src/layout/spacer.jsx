import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';

export default class Spacer extends React.PureComponent {
  static propTypes = {
    /** Horizontal size (in `px`) */
    h: PropTypes.number,

    /** Vertical size (in `px`) */
    v: PropTypes.number,

    /** Sets `display: inline-flex` */
    inline: PropTypes.bool,
    content: PropTypes.node,
  };

  static defaultProps = {
    h: 0,
    v: 0,
    content: null,
    inline: false,
  };

  render() {
    const { inline, content, v: vertical, h: horizontal, ...hiddenProps } = this.props;

    const display = inline ? 'inline-flex' : 'flex';

    return (
      <Hidden {...hiddenProps}>
        <span
          style={{
            display,
            height: vertical,
            width: horizontal,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </span>
      </Hidden>
    );
  }
}
