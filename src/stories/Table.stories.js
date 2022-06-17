import React from 'react';

import Table from '../table';

const testHeadings = [
  { id: 'columnOne', label: 'Column One' },
  { id: 'columnTwo', label: 'Column Two' },
];

const headings = {
  test_headings: testHeadings,
};

const tableData = [
  {
    id: 1,
    columnOne: 'test data 1',
    columnTwo: 'test data 2',
  },
  {
    id: 2,
    columnOne: 'test data 3',
    columnTwo: 'test data 4',
  },
  {
    id: 3,
    columnOne: 'test data 5',
    columnTwo: 'test data 6',
  },
  {
    id: 4,
    columnOne: 'test data 7',
    columnTwo: 'test data 8',
  },
  {
    id: 5,
    columnOne: 'test data 9',
    columnTwo: 'test data 10',
  },
];

const WuiTable = props => (
  <Table {...props}>
    <Table.Header headCells={headings.test_headings} />
    <Table.Body records={tableData} />
    <Table.Pagination recordsLength={tableData.length} />
  </Table>
);

export default {
  title: 'Table',
  component: WuiTable,
};

const Template = args => <WuiTable {...args} />;

export const TableScreen = Template.bind({});

TableScreen.args = {
  rowsPerPage: 2,
};
