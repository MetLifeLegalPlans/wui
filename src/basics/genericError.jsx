import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/core/styles';

import Typography from './typography';
import CustomIcon from './customIcon';

export const genericErrorText = 'There was an error processing your request, please try again.';

const styles = {
  iconItem: {
    // The margin helps line this up
    //   with a Fab button if it is
    //   in the same line.
    marginLeft: 8,
    display: 'flex',
  },
};

class GenericError extends React.PureComponent {
  static propTypes = {
    message: PropTypes.node,

    /** Whether or not to show a small icon */
    smallIcon: PropTypes.bool,

    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    message: genericErrorText,
    smallIcon: false,
  };

  render() {
    const { classes, message, smallIcon } = this.props;

    const iconDimension = smallIcon ? 24 : 54;
    const spacing = smallIcon ? 1 : 2;

    return (
      <Grid container spacing={spacing} alignItems="center">
        <Grid item className={classes.iconItem}>
          <CustomIcon
            width={iconDimension}
            height={iconDimension}
            src={ErrorIcon}
            color={theme => theme.palette.text.error}
          />
        </Grid>
        <Grid item xs>
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(GenericError);
