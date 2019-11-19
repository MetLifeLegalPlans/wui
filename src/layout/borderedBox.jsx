import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: [[20, 24]],
    borderRadius: theme.dimensions.borderRadius,
    border: [[1, 'solid', theme.palette.grey.panelBorder]],
  },
});

export default withStyles(styles)(({ classes, children }) => (
  <div className={classes.root}>{children}</div>
));
