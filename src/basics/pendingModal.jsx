import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@/layout/grid';
import Modal from '@/basics/modal';
import Button from '@/input/button';
import DimensionLimiter from '@/layout/dimensionLimiter';
import Spacer from '@/layout/spacer';

import Documents from '@/assets/images/documents.png';

const PendingModal = ({ open, title, onClose, onClick, buttonText, children, ...props }) => {
  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <Modal open={open} title={title} onClose={onClose} {...props}>
      <Grid container alignItems="center">
        <DimensionLimiter h={284}>
          <img src={Documents} alt="Documents" />
        </DimensionLimiter>

        <Spacer v={24} />

        {children}

        <Spacer v={24} />

        <Button variant="contained" color="primary" onClick={handleClick}>
          {buttonText}
        </Button>
      </Grid>
    </Modal>
  );
};

PendingModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,

  /** The message in the modal */
  children: PropTypes.node,
};

PendingModal.defaultProps = {
  onClick: () => null,
  buttonText: 'Continue',
  children: null,
};

export default PendingModal;
