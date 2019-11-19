import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    borderRight: [[1, 'solid', theme.palette.grey.panelBorder]],
  },
});

const VerticalDivider = ({ classes, h, spacing }) => (
  <div className={classes.root} style={{ height: h, margin: `0 ${spacing}px` }} />
);

VerticalDivider.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  h: PropTypes.number,
  spacing: PropTypes.number,
};

VerticalDivider.defaultProps = {
  h: 10,
  spacing: 24,
};

export default withStyles(styles)(VerticalDivider);
