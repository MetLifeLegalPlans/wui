import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@/basics/typography';

const styles = {
  root: {
    marginTop: 8,
  },
  error: {
    marginTop: 6,
    lineHeight: '18px',
    minHeight: 18,
  },
};

export default withStyles(styles)(
  ({ error, classes, children, className: externalClassName, noMargin, ...props }) => {
    const className = classNames(noMargin || classes.root, externalClassName);

    return (
      <form {...props} className={className}>
        {children}

        <Typography color="error" className={classes.error}>
          {error}
        </Typography>
      </form>
    );
  },
);
