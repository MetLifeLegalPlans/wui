import { useState } from 'react';

import { makeStyles } from '../theme';
import Modal from './Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

const noOp = () => {};

const DEFAULT_DELETE_MESSAGE = 'Are you sure you want to delete this item?';

const defaultStyles = {
  color: 'red',
};

const useStyles = makeStyles()({
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
});

const ConfirmDeleteButton = ({
  handleYesClicked,
  handleNoClicked,
  showConfirmModal,
  modalTitle,
  overrideStyles = {},
}) => {
  const { classes } = useStyles();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(showConfirmModal);

  const handleIconClick = e => {
    e.stopPropagation();
    setShowConfirmDeleteModal(true);
  };

  const handleNo = e => {
    e.stopPropagation();
    handleNoClicked(e);
    setShowConfirmDeleteModal(false);
  };

  const handleYes = e => {
    e.stopPropagation();
    handleYesClicked(e);
    setShowConfirmDeleteModal(false);
  };

  if (showConfirmDeleteModal) {
    return (
      <Modal
        open
        onClose={handleNo}
        title={modalTitle}
        onClick={e => e.stopPropagation()}
        /* this is used to align the title text with the close button */
        sx={{
          '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <ButtonGroup fullWidth className={classes.buttonGroup}>
          <Button onClick={handleYes} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={handleNo} variant="contained">
            No
          </Button>
        </ButtonGroup>
      </Modal>
    );
  }

  return (
    <IconButton style={{ ...defaultStyles, ...overrideStyles }} onClick={handleIconClick}>
      <DeleteIcon />
    </IconButton>
  );
};

export default ConfirmDeleteButton;

ConfirmDeleteButton.propTypes = {
  handleYesClicked: PropTypes.func.isRequired,
  overrideStyles: PropTypes.object,
  showConfirmModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  handleNoClicked: PropTypes.func,
};

ConfirmDeleteButton.defaultProps = {
  overrideStyles: {},
  handleNoClicked: noOp,
  showConfirmModal: false,
  modalTitle: DEFAULT_DELETE_MESSAGE,
};
