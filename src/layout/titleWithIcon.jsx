import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@/basics/typography';

function forceIndentAndPhone(theme, styles) {
  return {
    '&$forceIndent': styles,
    [theme.breakpoints.phone]: styles,
  };
}

const styles = theme => ({
  // Used to modify other classes.
  forceIndent: {},
  hideIconOnPhone: {},

  root: {
    '&$forceIndent': {
      marginLeft: '2em',

      [theme.breakpoints.phone]: {
        marginLeft: 0,
      },
    },

    '&:not($hideIconOnPhone)': {
      [theme.breakpoints.phone]: {
        marginLeft: -8,
      },
    },

    '& + &': {
      marginTop: 40,
    },
  },
  icon: {
    marginTop: '0.5em',
    transform: 'translateY(-0.25em)',

    '&:not($forceIndent)': {
      marginRight: 8,
      display: 'flex',

      [theme.breakpoints.notPhone]: {
        top: 0,
        right: '100%',
        position: 'absolute',
      },
    },

    '$hideIconOnPhone &': {
      [theme.breakpoints.phone]: {
        display: 'none',
      },
    },
  },
  title: {
    ...forceIndentAndPhone(theme, {
      display: 'flex',
      alignItems: 'flex-start',
    }),
  },
  content: {
    ...forceIndentAndPhone(theme, {
      marginLeft: '2em',
    }),

    '$hideIconOnPhone &': {
      [theme.breakpoints.phone]: {
        marginLeft: 0,
      },
    },
  },
});

class TitleWithIcon extends React.PureComponent {
  static propTypes = {
    forceIndent: PropTypes.bool,
    hideIconOnPhone: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,

    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    forceIndent: false,
    hideIconOnPhone: false,
  };

  render() {
    const {
      icon,
      title,
      classes,
      children,
      forceIndent,
      hideIconOnPhone,
      ...typographyProps
    } = this.props;

    const className = classNames(classes.root, {
      [classes.forceIndent]: forceIndent,
      [classes.hideIconOnPhone]: hideIconOnPhone,
    });

    return (
      <div className={className}>
        <Typography {...typographyProps} className={classes.title}>
          <span className={classes.icon}>{icon}</span>

          <span>{title}</span>
        </Typography>

        <div className={classes.content}>{children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(TitleWithIcon);
