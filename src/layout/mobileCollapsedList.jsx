import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Button from '@/input/button';
import Typography from '@/basics/typography';
import Grid from '@/layout/grid';

const styles = theme => ({
  seeMore: {
    color: theme.palette.blue.textboxFocus,
    textDecoration: 'underline',
    padding: [[8, 0]],
  },
});

// On screen size md and lower this component will display only
//   props.initiallyShowUpTo of its children, along with a link
//   to toggle viewing the rest
class MobileCollapsedList extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    initiallyShowUpTo: PropTypes.number,
    width: PropTypes.string.isRequired,
  };

  static defaultProps = {
    initiallyShowUpTo: 1,
  };

  state = {
    closed: true,
  };

  toggleClosed = () => {
    const { closed } = this.state;
    this.setState({ closed: !closed });
  };

  render() {
    const { classes, children, initiallyShowUpTo: propsInitiallyShowUpTo, width } = this.props;
    const { closed } = this.state;
    const arrChildren = React.Children.toArray(children);
    const isMobileDisplay = !isWidthUp('md', width);

    let initiallyShowUpTo = propsInitiallyShowUpTo;

    if (isWidthUp('sm', width)) {
      initiallyShowUpTo += 1;
    }

    // If there's only one item/not enough to hide, there is nothing to collapse
    if (arrChildren.length === 1 || arrChildren.length <= initiallyShowUpTo) {
      return children;
    }

    const initialItems = arrChildren.slice(0, initiallyShowUpTo);
    const collapseableItems = arrChildren.slice(initiallyShowUpTo);

    return (
      <React.Fragment>
        {initialItems}

        <Collapse in={!(closed && isMobileDisplay)}>{collapseableItems}</Collapse>

        <Hidden mdUp>
          <Grid container alignItems="center">
            <Button variant="text" onClick={this.toggleClosed}>
              <Typography className={classes.seeMore}>
                {closed ? `See ${collapseableItems.length} more` : 'See less'}
              </Typography>
            </Button>
          </Grid>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(MobileCollapsedList));
