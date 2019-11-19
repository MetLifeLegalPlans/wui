import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  middlePosition: {},

  root: {
    top: 0,
    right: 0,
    fontSize: 30,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    lineHeight: '5px',
    background: 'none',
    padding: [[20, 20, 26]],
    position: 'absolute',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,

    '&$middlePosition': {
      bottom: 0,
    },
  },
});

class CloseButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    position: PropTypes.oneOf(['top', 'middle']),
  };

  static defaultProps = {
    position: 'middle',
  };

  render() {
    const { classes, onClick, position } = this.props;

    const className = classNames(classes.root, classes[`${position}Position`]);

    return (
      <button type="button" onClick={onClick} className={className}>
        &#x2715;
      </button>
    );
  }
}

export default withStyles(styles)(CloseButton);
