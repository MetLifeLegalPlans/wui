import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { makeStyles } from './theme';

const useStyles = makeStyles()(theme => ({
  content: {
    padding: theme.spacing(2),
  },
}));

const Modal = ({ title, open, onClose, children, ...props }) => {
  const classes = useStyles();

  return (
    <Dialog onClose={onClose} open={open} {...props}>
      <DialogTitle
        sx={{
          display: 'flex',
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            marginLeft: 'auto',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.content}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  open: false,
  children: null,
};

export default Modal;
