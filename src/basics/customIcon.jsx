import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

const INLINE = 'inline';

class CustomIcon extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    block: PropTypes.oneOf([false, true, INLINE]),
    src: PropTypes.func.isRequired,
    theme: PropTypes.shape({}).isRequired,
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
