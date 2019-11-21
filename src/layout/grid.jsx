import React from 'react';
import PropTypes from 'prop-types';
import MuiGrid from '@material-ui/core/Grid';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const reverseDirections = {
  row: 'row-reverse',
  'row-reverse': 'row',
  column: 'column-reverse',
  'column-reverse': 'column',
};

class Grid extends React.PureComponent {
  static propTypes = {
    /** @ignore */
    width: PropTypes.string.isRequired,
    reverseDirectionOnPhone: PropTypes.bool,

    /** Corresponds to the `flex-shrink` CSS property */
    shrink: PropTypes.string,
  };

  static defaultProps = {
    reverseDirectionOnPhone: false,
    shrink: null,
  };

  render() {
    const { reverseDirectionOnPhone, width, ...rest } = this.props;

    const { direction: externalDirection = 'column', shrink, ...gridProps } = rest;

    const style = {};

    if (shrink !== null) {
      style.flexShrink = shrink;
    }

    let direction = externalDirection;
    if (isWidthDown('xs', width) && reverseDirectionOnPhone) {
      direction = reverseDirections[direction];
    }

    const containerGridProps = gridProps.container ? { direction } : {};

    return <MuiGrid {...gridProps} {...containerGridProps} style={style} />;
  }
}

export default withWidth()(Grid);
