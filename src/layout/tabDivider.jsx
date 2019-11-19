import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const margin = 48;

const styles = theme => ({
  // Used to modify other classes.
  halfMargin: {},

  root: {
    height: 0,
    width: '100%',
    borderTop: [[1, 'solid', theme.palette.grey.textboxBorder]],
  },
  margin: {
    marginTop: margin,
    marginBottom: margin,

    '&$halfMargin': {
      marginTop: margin / 2,
      marginBottom: margin / 2,
    },
  },
  dashed: {
    borderTopStyle: 'dashed',
  },
  absolute: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  expanded: {
    left: '50%',
    right: '50%',
    width: '100vw',
    maxWidth: '100vw',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    position: 'relative',
  },
});

export default withStyles(styles)(
  ({ dashed, classes, absolute, expanded, noMargin, halfMargin }) => {
    const className = classNames(classes.root, {
      [classes.dashed]: dashed,
      [classes.margin]: !noMargin,
      [classes.expanded]: expanded,
      [classes.absolute]: absolute,
      [classes.halfMargin]: halfMargin,
    });

    return <div className={className} />;
  },
);
