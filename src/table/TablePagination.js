import React from 'react';
import PropTypes from 'prop-types';

import { TablePagination, TableRow, TableFooter } from '@mui/material';

const Pagination = ({ recordsLength, page, setPage, rowsPerPage }) => {
  // called with event & newPage
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          component="td"
          page={page}
          rowsPerPage={rowsPerPage}
          count={recordsLength}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[-1]}
        />
      </TableRow>
    </TableFooter>
  );
};

Pagination.propTypes = {
  recordsLength: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
