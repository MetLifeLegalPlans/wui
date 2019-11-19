import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Panel from './panel';
import PanelTitle from './panelTitle';

export const SPACING = 8;

const columnShape = PropTypes.shape({
  hidden: PropTypes.bool,
  title: PropTypes.node.isRequired,
});

const rowShape = PropTypes.shape({
  special: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        content: PropTypes.node.isRequired,
      }),
    ]),
  ).isRequired,
});

// Divide by 8 to convert from pixels into grid spacing units
const OuterGrid = props => <Grid container spacing={SPACING / 8} {...props} />;

export default class Table extends React.PureComponent {
  static propTypes = {
    rows: PropTypes.arrayOf(rowShape).isRequired,
    columns: PropTypes.arrayOf(columnShape).isRequired,
  };

  renderColumn = (column, columnIndex) => {
    const { title, hidden, ...props } = column;

    if (hidden) {
      return null;
    }

    return (
      <Grid item key={columnIndex} {...props}>
        {title}
      </Grid>
    );
  };

  renderRowContent = (content, columnIndex) => {
    const { columns } = this.props;
    const source = React.isValidElement(content) ? { content } : content;
    const { content: renderContent, ...cellProps } = source;
    const { hidden, title, ...columnProps } = columns[columnIndex] || {};

    if (hidden) {
      return null;
    }

    return (
      <Grid item {...columnProps} {...cellProps} key={columnIndex}>
        {renderContent}
      </Grid>
    );
  };

  renderRow = (row, rowIndex) => {
    const { content, special, ...rowProps } = row;

    return (
      <Panel tableRow lessPadding key={rowIndex} special={special}>
        <OuterGrid {...rowProps}>{content.map(this.renderRowContent)}</OuterGrid>
      </Panel>
    );
  };

  render() {
    const { columns, rows } = this.props;

    return (
      <React.Fragment>
        <Panel paddingless borderless>
          <Panel
            tableRow
            lessPadding
            style={{ borderBottom: 0, overflow: 'hidden', paddingBottom: 0 }}
          >
            <PanelTitle style={{ marginBottom: 0 }}>
              <OuterGrid>{columns.map(this.renderColumn)}</OuterGrid>
            </PanelTitle>
          </Panel>

          {rows.map(this.renderRow)}
        </Panel>
      </React.Fragment>
    );
  }
}
