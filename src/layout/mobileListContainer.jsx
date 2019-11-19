import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';

import Typography from '@/basics/typography';
import Spacer from '@/layout/spacer';

const styles = theme => ({
  root: {
    [theme.breakpoints.tablet]: {
      padding: [[0, 16]],
      border: `1px solid ${theme.palette.grey.panelBorder}`,
      borderTopWidth: 8,
      borderRadius: [[3, 3, 0, 0]],
    },
  },
});

const MobileListContainer = ({ classes, className, title, children }) => (
  <div className={classNames(classes.root, className)}>
    {title && (
      <Hidden mdUp>
        <Spacer v={8} />
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
      </Hidden>
    )}
    {children}
  </div>
);

MobileListContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

MobileListContainer.defaultProps = {
  className: '',
  title: '',
};

export default withStyles(styles)(MobileListContainer);
