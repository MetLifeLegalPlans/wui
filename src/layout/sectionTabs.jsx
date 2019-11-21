import React from 'react';
import PropTypes from 'prop-types';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

const indicator = theme => ({
  height: 4,
  borderRadius: [[theme.dimensions.borderRadius, theme.dimensions.borderRadius, 0, 0]],
});

const styles = theme => ({
  root: {
    minHeight: 'auto',
    background: theme.palette.common.white,
  },
  indicator: {
    ...indicator(theme),
    background: theme.gradients.special,
  },
  unselectedIndicator: {
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    ...indicator(theme),
    position: 'absolute',
    background: theme.palette.grey.panelBorder,
  },
});

const tabStyles = theme => ({
  // Used to modify other classes.
  selected: {},

  root: {
    opacity: 1,
    minWidth: 'auto',
    minHeight: 'auto',
    position: 'relative',
    padding: [[24, 16, 4, 16]],
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 'normal',
    textTransform: 'none',
    color: theme.palette.text.secondary,

    '&$selected': {
      fontWeight: 600,
      color: theme.palette.text.primary,
    },

    '& + &': {
      marginLeft: 16,
    },
  },
});

const StyledTab = withStyles(tabStyles)(MuiTab);

class SectionTabs extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.number,
    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        name: PropTypes.node.isRequired,
      }),
    ).isRequired,
  };

  static defaultProps = {
    selected: 0,
    onSelect: () => {},
  };

  handleTabChange = (event, value) => {
    const { onSelect } = this.props;

    onSelect(value);
  };

  updateIndicatorAfterLoad = actions => {
    // Actions is not always available on first mount
    if (actions) {
      setTimeout(actions.updateIndicator, 100);
    }
  };

  render() {
    const { classes, selected, tabs } = this.props;
    const { unselectedIndicator, ...tabClasses } = classes;

    return (
      <MuiTabs
        value={selected}
        scrollButtons="off"
        classes={tabClasses}
        variant="scrollable"
        onChange={this.handleTabChange}
        action={this.updateIndicatorAfterLoad}
      >
        {tabs.map(t => (
          <StyledTab
            key={t.name}
            label={
              <React.Fragment>
                <span className={unselectedIndicator} />

                <span>{t.name}</span>
              </React.Fragment>
            }
            disabled={t.disabled}
          />
        ))}
      </MuiTabs>
    );
  }
}

export default withStyles(styles)(SectionTabs);
