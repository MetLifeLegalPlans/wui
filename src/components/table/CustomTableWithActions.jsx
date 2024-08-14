import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Delete, Edit, FileCopy, PictureAsPdf } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import ConfirmDeleteButton from '../ConfirmDeleteButton';
import CustomTable from './CustomTable';

const DEFAULT_DELETE_MESSAGE = 'Are you sure you want to delete this item?';

const CustomTableWithActions = ({
  columns,
  data,
  totalRows,
  editAction,
  deleteAction,
  createAction,
  copyAction,
  detailAction,
  exportToPdf,
  ...props
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowDeleteMessage, setSelectedRowDeleteMessage] = useState(DEFAULT_DELETE_MESSAGE);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        totalRows={totalRows}
        enableEditing
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem', paddingRight: '2.5rem' }}>
            {copyAction && (
              <Tooltip arrow placement="left" title="Copy">
                <IconButton
                  onClick={e => {
                    // each of those stop propagations are set to prevent the row click event from firing when clicking on the action buttons
                    e.stopPropagation();
                    copyAction.handleCopy(row.original);
                  }}
                >
                  <FileCopy />
                </IconButton>
              </Tooltip>
            )}

            {deleteAction && (
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  disabled={deleteAction.isDisabled?.(row.original) || false}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedRowId(row.original.id);
                    setShowConfirmModal(true);
                    setSelectedRowDeleteMessage(deleteAction.deleteMessage?.(row.original));
                  }}
                >
                  {deleteAction.isDeleting && selectedRowId === row.original.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Delete />
                  )}
                </IconButton>
              </Tooltip>
            )}

            {detailAction && (
              <Tooltip arrow placement="left" title="Detail">
                <IconButton
                  disabled={detailAction.isDisabled?.(row.original) || false}
                  onClick={e => {
                    e.stopPropagation();
                    detailAction.handleDetail(row.original);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            )}

            {exportToPdf && (
              <Tooltip arrow placement="left" title="Export to PDF">
                <IconButton
                  onClick={e => {
                    e.stopPropagation();
                    exportToPdf(row.original);
                  }}
                >
                  <PictureAsPdf />
                </IconButton>
              </Tooltip>
            )}

            {editAction && (
              <Tooltip arrow placement="right" title="Edit">
                <IconButton
                  disabled={editAction.isDisabled?.(row.original) || false}
                  onClick={e => {
                    e.stopPropagation();
                    editAction.handleEdit(row.original);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
        renderTopToolbarCustomActions={() =>
          createAction && (
            <Button color="primary" onClick={createAction.handleCreate} variant="contained">
              {createAction.title}
            </Button>
          )
        }
        {...props}
      />
      {showConfirmModal && (
        <ConfirmDeleteButton
          handleYesClicked={async () => {
            try {
              await deleteAction.handleDelete(selectedRowId);
            } catch (err) {
              toast.error('error removing table entry', {
                style: {
                  backgroundColor: 'red',
                },
              });
            }
            setShowConfirmModal(false);
          }}
          handleNoClicked={() => setShowConfirmModal(false)}
          showConfirmModal
          modalTitle={selectedRowDeleteMessage}
        />
      )}
    </>
  );
}

CustomTableWithActions.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalRows: PropTypes.number.isRequired,
  editAction: PropTypes.shape({
    handleEdit: PropTypes.func,
  }),
  deleteAction: PropTypes.shape({
    // handleDelete should be an async function
    handleDelete: PropTypes.func,
    isDeleting: PropTypes.bool,
    isDisabled: PropTypes.func,
    deleteMessage: PropTypes.func,
  }),
  createAction: PropTypes.shape({
    handleCreate: PropTypes.func,
    title: PropTypes.string,
  }),
  copyAction: PropTypes.shape({
    handleCopy: PropTypes.func,
  }),
  detailAction: PropTypes.shape({
    handleDetail: PropTypes.func,
    isDisabled: PropTypes.func,
  }),
  exportToPdf: PropTypes.func,
};

CustomTableWithActions.defaultProps = {
  editAction: null,
  deleteAction: null,
  createAction: null,
  copyAction: null,
  detailAction: null,
  exportToPdf: null,
};
export default CustomTableWithActions;
