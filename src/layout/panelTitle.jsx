import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import CustomIcon from '@/basics/customIcon';

import Notice from '@/layout/notice';
import { borderWidth, panelDimensions } from './panel';

function margin(vertical, horizontal) {
  return [-vertical, -horizontal, vertical, -horizontal];
}

function width(vertical, horizontal) {
  return `calc(100% + ${2 * horizontal}px)`;
}

function padding() {
  return [8, 16];
}

const styles = theme => {
  const rootMargin = panelDimensions(theme, 'margin', margin, {}, true);
  const rootWidth = panelDimensions(theme, 'width', width, rootMargin, true);
  const root = panelDimensions(theme, 'padding', padding, rootWidth, true);

  return {
    notice: {},

    root: {
      ...root,
      zIndex: 1,
      flexWrap: 'nowrap',
      position: 'relative',
      color: theme.palette.text.secondary,
      background: theme.palette.background.default,
      borderBottom: [[borderWidth, 'solid', theme.palette.grey.panelBorder]],

      '&$notice': {
        padding: 0,
        borderBottom: 'none',
      },
    },
    icon: {
      marginRight: 12,
    },
    text: {
      fontSize: 14,
      lineHeight: '16px',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
    },
    left: {
      display: 'flex',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    right: {
      marginLeft: 8,
      alignSelf: 'center',
    },
  };
};

class PanelTitle extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.func,
    right: PropTypes.node,
    isNotice: PropTypes.bool,
    simple: PropTypes.bool,
    noticeProps: PropTypes.shape({}),
    children: PropTypes.node,

    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    icon: null,
    right: null,
    isNotice: false,
    simple: false,
    noticeProps: {},
    children: null,
  };

  render() {
    const { icon, right, isNotice, simple, noticeProps, classes, children, ...rest } = this.props;

    const { className: externalClassName, ...passedProps } = rest;

    const rootClassName = classNames(classes.root, externalClassName, {
      [classes.notice]: isNotice,
    });

    if (isNotice) {
      return (
        <div {...passedProps} className={rootClassName}>
          <Notice className={classes.root} {...noticeProps}>
            {children}
          </Notice>
        </div>
      );
    }

    if (simple) {
      return (
        <div {...passedProps} className={rootClassName}>
          {children}
        </div>
      );
    }

    return (
      <Grid container justify="space-between" className={rootClassName} {...passedProps}>
        <Grid item xs={right ? null : 12} className={classNames(classes.text, classes.left)}>
          {icon && (
            <CustomIcon
              src={icon}
              height={16}
              className={classes.icon}
              color={theme => theme.palette.text.secondary}
            />
          )}

          {children}
        </Grid>

        {right && (
          <Grid item className={classNames(classes.text, classes.right)}>
            {right}
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(PanelTitle);
