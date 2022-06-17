import React from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableBody, TableRow } from '@mui/material';
import { makeStyles } from 'theme';

const useStyles = makeStyles()(onRowClick => ({
  tableRow: {
    cursor: onRowClick ? 'pointer' : 'default',
    '&:nth-of-type(even)': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

const getInDescOrder = (a, b, orderColumnBy) => {
  if (a[orderColumnBy] > b[orderColumnBy]) return -1;
  if (a[orderColumnBy] < b[orderColumnBy]) return 1;
  return 0;
};

const customComparator = (reverse, orderColumnBy) =>
  reverse
    ? (a, b) => getInDescOrder(a, b, orderColumnBy)
    : (a, b) => -getInDescOrder(a, b, orderColumnBy);

const sortRecords = (tableRecords, comparator) => {
  const tobeSortedRecords = tableRecords.map((record, i) => [record, i]);
  tobeSortedRecords.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);
    if (newOrder !== 0) return newOrder;
    return a[1] - b[1];
  });

  return tobeSortedRecords.map(record => record[0]);
};

const Body = ({ records, reverse, orderBy, page, rowsPerPage, onRowClick, fields }) => {
  const { classes } = useStyles(onRowClick);

  const dataAfterPaging = () => {
    const sortedRecords = sortRecords(records, customComparator(reverse, orderBy));
    return sortedRecords.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <TableBody>
      {dataAfterPaging().map(row => {
        const cells = fields || Object.keys(row).filter(cell => cell !== 'id');

        return (
          <TableRow key={row.id} className={classes.tableRow} onClick={() => onRowClick?.(row)}>
            {cells.map(cell => (
              <TableCell key={cell} align="left">
                {row[cell]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

Body.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  reverse: PropTypes.bool.isRequired,
  orderBy: PropTypes.string,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
  fields: PropTypes.array,
};

Body.defaultProps = {
  orderBy: undefined,
  onRowClick: null,
  fields: null,
};
export default Body;
