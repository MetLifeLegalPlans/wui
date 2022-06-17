/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Table as MuiTable, TableContainer, Paper } from '@mui/material';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';

const Table = ({ children, rowsPerPage }) => {
  const [reverse, setReverse] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);

  const value = React.useMemo(
    () => ({ reverse, setReverse, orderBy, setOrderBy, page, setPage, rowsPerPage }),
    [orderBy, page, reverse, rowsPerPage],
  );

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, value);
    }
    return child;
  });

  return (
    <TableContainer component={Paper}>
      <MuiTable>{childrenWithProps}</MuiTable>
    </TableContainer>
  );
};

Table.Header = props => <TableHeader {...props} />;
Table.Body = props => <TableBody {...props} />;
Table.Pagination = props => <TablePagination {...props} />;
Table.propTypes = {
  children: PropTypes.node.isRequired,
  rowsPerPage: PropTypes.number,
};

Table.defaultProps = {
  rowsPerPage: 20,
};

export default Table;
