import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const bottomMargin = 24;

const styles = theme => ({
  root: {
    maxWidth: 970,

    margin: [[theme.dimensions.panelSpacing.default, 'auto', bottomMargin]],

    [theme.breakpoints.tablet]: {
      margin: [
        [theme.dimensions.panelSpacing.default, theme.dimensions.panelSpacing.tablet, bottomMargin],
      ],
    },

    [theme.breakpoints.phone]: {
      margin: [
        [theme.dimensions.panelSpacing.phone, theme.dimensions.panelSpacing.phone, bottomMargin],
      ],
    },
  },
});

export default withStyles(styles)(({ children, classes }) => (
  <div className={classes.root}>{children}</div>
));
