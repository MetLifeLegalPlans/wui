import { MaterialReactTable } from 'material-react-table';

import PropTypes from 'prop-types';

const CustomTable = ({ columns, data, totalRows, ...props }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      rowCount={totalRows}
      enableColumnActions={false}
      enableColumnFilters={false}
      positionActionsColumn="last"
      {...props}
    />
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalRows: PropTypes.number.isRequired,
};

export default CustomTable;
