import React from 'react';
import PropTypes from 'prop-types';

// When ExpansionPanels are grouped in an ExclusivePanelGroup, expanding one
//   of the panels causes the others to collapse
class ExclusivePanelGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    selected: null,
  };

  handleChange = index => (event, expanded) => this.setState({ selected: expanded ? index : null });

  render() {
    const { children } = this.props;
    const { selected } = this.state;

    const arrChildren = React.Children.toArray(children);

    return (
      <React.Fragment>
        {arrChildren.map((child, index) =>
          React.cloneElement(child, {
            expanded: selected === index,
            onChange: this.handleChange(index),
            key: index, // eslint-disable-line react/no-array-index-key
          }),
        )}
      </React.Fragment>
    );
  }
}

export default ExclusivePanelGroup;
