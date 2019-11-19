import React from 'react';
import PropTypes from 'prop-types';
import MuiModal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import Panel from '@/layout/panel';
import Typography from './typography';
import CloseButton from './closeButton';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: theme.palette.grey.modalBackground,
  },
  panel: {
    maxWidth: 715,
    outline: 'none',
    overflowY: 'auto',
    margin: [[16, 16]],
    maxHeight: 'calc(100% - 32px)',
  },
  title: {
    padding: [[16, 24]],
    textTransform: 'uppercase',
    borderBottom: [[1, 'solid', theme.palette.grey.panelBorder]],

    [theme.breakpoints.phone]: {
      padding: [[16, 16]],
    },
  },
  content: {
    padding: [[32, 48]],

    [theme.breakpoints.phone]: {
      padding: [[24, 24]],
    },
  },
});

class Modal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    onClose: null,
  };

  render() {
    const { title, classes, onClose, children, ...props } = this.props;

    return (
      <MuiModal
        {...props}
        disableAutoFocus
        className={classes.root}
        BackdropProps={{ classes: { root: classes.backdrop } }}
      >
        <Panel active paddingless className={classes.panel}>
          <Typography variant="h6" component="div" className={classes.title}>
            {title}

            {onClose && <CloseButton onClick={onClose} />}
          </Typography>

          <Typography component="div" className={classes.content}>
            {children}
          </Typography>
        </Panel>
      </MuiModal>
    );
  }
}

export default withStyles(styles)(Modal);
