import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

const INLINE = 'inline';

class CustomIcon extends React.PureComponent {
  static propTypes = {
    /** Pixel width of the icon */
    width: PropTypes.number,

    /** Pixel height of the icon */
    height: PropTypes.number,

    /** Display type: `initial`, `block`, or `inline-block` */
    block: PropTypes.oneOf([false, true, INLINE]),

    src: PropTypes.func.isRequired,

    /** @ignore */
    theme: PropTypes.shape({}).isRequired,

    /** Either a function that takes the MUI theme or a hex code */
    color: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    opacity: PropTypes.number,
  };

  static defaultProps = {
    color: null,
    width: null,
    height: null,
    block: false,
    opacity: null,
  };

  render() {
    const {
      theme,
      width,
      height,
      block,
      src: SrcComponent,
      color: externalColor,
      opacity,
      ...props
    } = this.props;

    let color = externalColor;
    if (typeof color === 'function') {
      color = externalColor(theme);
    }

    const style = {};

    if (color) {
      style.fill = color;
      style.color = color;
    }

    if (height) {
      style.height = `${height}px`;
    }

    if (width) {
      style.width = `${width}px`;
    }

    if (block) {
      style.display = block === INLINE ? 'inline-block' : 'block';
    }

    if (opacity) {
      style.opacity = opacity;
    }

    return <SrcComponent style={style} {...props} />;
  }
}

export default withTheme(CustomIcon);
