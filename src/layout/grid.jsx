import React from 'react';
import PropTypes from 'prop-types';
import MuiGrid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../theme';

const reverseDirections = {
  row: 'row-reverse',
  'row-reverse': 'row',
  column: 'column-reverse',
  'column-reverse': 'column',
};

const Grid = ({ width, reverseDirectionOnPhone, shrink, grow, ...rest }) => {
  const { direction: externalDirection = 'column', ...gridProps } = rest;
  const phoneSize = useMediaQuery(theme.breakpoints.down('xs'));
  const style = {};

  if (shrink !== null) {
    style.flexShrink = shrink;
  }

  if (grow != null) {
    style.flexGrow = grow;
  }

  let direction = externalDirection;
  if (phoneSize && reverseDirectionOnPhone) {
    direction = reverseDirections[direction];
  }

  const containerGridProps = gridProps.container ? { direction } : {};

  return <MuiGrid {...gridProps} {...containerGridProps} style={style} />;
};

Grid.propTypes = {
  /** @ignore */
  width: PropTypes.string.isRequired,

  /** Reverse directions for size xs */
  reverseDirectionOnPhone: PropTypes.bool,

  /** Corresponds to the `flex-shrink` CSS property */
  shrink: PropTypes.string,

  /** Corresponds to the `flex-grow` CSS property */
  grow: PropTypes.number,
};

Grid.defaultProps = {
  reverseDirectionOnPhone: false,
  shrink: null,
  grow: null,
};

export default Grid;
