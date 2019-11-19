import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from './table';
import Spacer from './spacer';

const columns = [
  { title: 'First Column', xs: true },
  { title: 'Second Column', xs: 3 },
  { title: 'Third Column', xs: 3, align: 'right' },
];

const rows = [
  {
    content: ['C1R1', 'C2R1', 'C3R1'],
  },
  {
    special: true,
    content: ['C1R2', 'C2R2', 'C3R2'],
  },
  {
    content: ['C1R3', 'C2R3', 'C3R3'],
  },
];

const hiddenColumns = [
  { title: 'Visible', xs: true },
  { title: 'Hidden', xs: 3, hidden: true },
  { title: 'Also Visible', xs: 3 },
];

storiesOf('Layout', module).add('Table', () => (
  <div style={{ padding: 5 }}>
    <Table rows={rows} columns={columns} />

    <Spacer v={20} />

    <Table rows={rows} columns={hiddenColumns} />
  </div>
));
