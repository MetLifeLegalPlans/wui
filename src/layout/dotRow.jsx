import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ActiveDot from '@a/images/active-dot.svg';

const dotSize = 16;
const dashWidth = 2;
const marginSize = 10;
const activeDotSize = 24;
const inactiveRule = '$root:not($active) &';
const pendingRule = '$active ~ $root:not($active) &';

const styles = theme => ({
  // Used to modify other classes.
  active: {},
  clickable: {},

  root: {
    display: 'relative',

    '&$clickable': {
      cursor: 'pointer',
    },

    '&:not(:last-of-type) $content': {
      marginBottom: 32,
    },
  },
  left: {
    position: 'relative',
    marginRight: marginSize,
    flex: [[0, 0, `${activeDotSize}px`]],
  },
  dash: {
    top: 0,
    width: 0,
    bottom: 0,
    position: 'absolute',
    left: `calc(50% - ${dashWidth / 2}px)`,
    borderRight: [[dashWidth, 'dashed', theme.palette.grey.panelBorder]],
  },
  content: {
    flex: 1,

    '& > :not(.dot-row-specific):first-child, & > .dot-row-specific .dot-row-aligner': {
      zIndex: 0,
      position: 'relative',

      '&:before': {
        top: '50%',
        zIndex: -1,
        content: "''",
        borderRadius: '50%',
        position: 'absolute',
        width: activeDotSize,
        height: activeDotSize,
        transform: 'translateY(-50%)',
        left: -activeDotSize - marginSize,
        background: `url(${ActiveDot}) center center no-repeat`,

        [`${inactiveRule}, ${pendingRule}`]: {
          width: dotSize,
          height: dotSize,
          left: -activeDotSize / 2 - marginSize - dotSize / 2,
          border: [[4, 'solid', theme.palette.green.success]],
        },

        [inactiveRule]: {
          borderWidth: 0,
          background: theme.gradients.special,
        },

        [pendingRule]: {
          borderWidth: 3,
          background: theme.palette.common.white,
          borderColor: theme.palette.grey.selectedTab,
        },
      },

      '&:after': {
        zIndex: -2,
        height: 1000,
        bottom: '50%',
        content: "''",
        position: 'absolute',
        width: activeDotSize,
        left: -activeDotSize - marginSize,
        background: theme.palette.common.white,

        '$root + $root &': {
          display: 'none',
        },

        '$root + $root:last-of-type &': {
          top: '50%',
          bottom: 'auto',
          display: 'block',
        },
      },
    },
  },
});

class DotRow extends React.PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    active: false,
    onClick: null,
  };

  handleClick = e => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(e);
    }
  };

  render() {
    const { active, classes, onClick, children } = this.props;

    const rootClassName = classNames(classes.root, {
      [classes.active]: active,
      [classes.clickable]: onClick,
    });

    return (
      <Grid container className={rootClassName} onClick={this.handleClick}>
        <Grid item className={classes.left}>
          <span className={classes.dash} />
        </Grid>
        <Grid item className={classes.content}>
          {children}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DotRow);
