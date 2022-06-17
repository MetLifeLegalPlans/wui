import React from 'react';
import PropTypes from 'prop-types';

import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { makeStyles } from 'theme';

const useStyles = makeStyles()(() => ({
  tableHeader: {
    backgroundColor: 'lightgray',
  },
}));

const Header = ({ headCells, reverse, orderBy, setReverse, setOrderBy }) => {
  const { classes } = useStyles();

  const handleSortRequest = headRowId => {
    const isAsc = orderBy === headRowId && !reverse;
    setReverse(isAsc);
    setOrderBy(headRowId);
  };

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {headCells.map(headRow => (
          <TableCell
            align="left"
            key={headRow.id}
            // eslint-disable-next-line no-nested-ternary
            sortDirection={orderBy === headRow.id ? (reverse ? 'desc' : 'asc') : false}
          >
            <TableSortLabel
              active={orderBy === headRow.id}
              direction={orderBy === headRow.id ? 'desc' : 'asc'}
              onClick={() => handleSortRequest(headRow.id)}
            >
              {headRow.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

Header.propTypes = {
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  reverse: PropTypes.bool.isRequired,
  orderBy: PropTypes.string,
  setReverse: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

Header.defaultProps = {
  orderBy: undefined,
};

export default Header;
