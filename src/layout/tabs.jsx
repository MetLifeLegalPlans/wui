import React from 'react';
import PropTypes from 'prop-types';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Panel, { borderWidth } from './panel';
import WuiTab from './tab';

export const tabContentMobilePadding = 24;
export const tabContentVerticalPadding = 32;
export const tabContentHorizontalPadding = 32;

const styles = theme => ({
  noContentPadding: {},
  indicator: {},

  root: {
    borderTop: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  hideIndicator: {
    '& $indicator': {
      display: 'none',
    },
  },
  tabsWrapper: {
    width: '100%',
    position: 'relative',

    // The tabs need to be above the contents Panel to prevent the
    //   box shadow from the panel appearing on the tabs
    zIndex: theme.zIndex.above,
  },
  tabsElement: {
    flex: 1,
    borderTopLeftRadius: theme.dimensions.borderRadius,
    borderTopRightRadius: theme.dimensions.borderRadius,
  },
  nextToTabs: {
    flex: 0,
    borderBottom: [[borderWidth, 'solid', theme.palette.grey.panelBorder]],
  },
  tabFiller: {
    flex: [[1, 0, 0]],
    borderBottom: [[1, 'solid', theme.palette.grey.panelBorder]],
  },
  content: {
    '&:not($noContentPadding)': {
      padding: [[tabContentVerticalPadding, tabContentHorizontalPadding]],

      [theme.breakpoints.phone]: {
        padding: tabContentMobilePadding,
      },
    },
  },
});

const tabsStyles = theme => ({
  flexContainer: {
    'align-items': 'flex-end',
  },
  indicator: {
    // Instead of the standard indicator, we
    //   place ours at the top of the tab. To
    //   hide the original one, we clear the
    //   background color.
    height: '100%',
    background: 'none',

    // The left and width have the 2 pixel
    //   adjustment because of the tab borders.
    '& [data-indicator]': {
      left: -2,
      height: 8,
      position: 'absolute',
      width: 'calc(100% + 2px)',
      background: theme.palette.grey.selectedTab,
      borderTopLeftRadius: theme.dimensions.borderRadius,
      borderTopRightRadius: theme.dimensions.borderRadius,

      // Remove the adjustment for the last
      //   tab.
      '&[data-last=true]': {
        left: 0,
        width: '100%',
      },

      '&[data-special]': {
        background: theme.gradients.special,
      },
    },
  },
});

const StyledTabs = withStyles(tabsStyles)(MuiTabs);

// The purppose of this component is to fill the empty space and apply a
//   border when the tabs do not take up the full width that is available.
//   We are copying over the props from MUI's Tab to avoid console errors
//   when the MUI Tabs component passes props to its children.
const TabFiller = ({ className }) => <div className={className} />;
TabFiller.propTypes = MuiTab.propTypes;
TabFiller.defaultProps = MuiTab.defaultProps;

const tabShape = PropTypes.shape({
  special: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  noticeText: PropTypes.string,
});

class Tabs extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.number,
    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
    tabs: PropTypes.arrayOf(tabShape).isRequired,

    /** Allows you to fill dead space before the edge of the screen with an element */
    nextToTabs: PropTypes.node,
    noContentPadding: PropTypes.bool,
    tabsFillWidth: PropTypes.bool,
    smallTabs: PropTypes.bool,
    borderless: PropTypes.bool,
  };

  static defaultProps = {
    selected: 0,
    onSelect: () => {},
    nextToTabs: null,
    noContentPadding: false,
    tabsFillWidth: true,
    smallTabs: false,
    borderless: false,
  };

  handleTabChange = (event, value) => {
    const { onSelect } = this.props;

    onSelect(value);
  };

  updateIndicatorAfterLoad = actions => {
    if (actions) {
      setTimeout(actions.updateIndicator, 100);
    }
  };

  render() {
    const {
      classes,
      selected,
      tabs,
      nextToTabs,
      noContentPadding,
      tabsFillWidth,
      smallTabs,
      borderless,
    } = this.props;

    const selectedTab = tabs[selected] || {};
    const hasNotices = tabs.some(t => t.noticeText);

    const tabIndicatorChildProps = selectedTab.special ? { 'data-special': true } : {};

    // If we are provided with notice texts, the notices
    //   take the place of the tab indicator.
    const tabsClass = classNames(classes.tabsElement, hasNotices && classes.hideIndicator);

    return (
      <React.Fragment>
        <Grid container direction="row" className={classes.tabsWrapper}>
          <StyledTabs
            className={tabsClass}
            classes={{ indicator: classes.indicator }}
            value={selected}
            scrollButtons="off"
            variant="scrollable"
            onChange={this.handleTabChange}
            action={this.updateIndicatorAfterLoad}
            TabIndicatorProps={{
              children: (
                <div
                  data-indicator
                  data-last={selected === tabs.length - 1}
                  {...tabIndicatorChildProps}
                />
              ),
            }}
          >
            {tabs.map(t => (
              <WuiTab
                key={t.id ? t.id : t.name}
                label={t.name}
                disabled={t.disabled}
                noticeText={t.noticeText}
                hasNotice={hasNotices}
                noticeProps={{ special: t.special, primary: t.primary }}
                fillWidth={tabsFillWidth}
                lessPadding={smallTabs}
              />
            ))}
            {!tabsFillWidth && <TabFiller className={classes.tabFiller} />}
          </StyledTabs>
          <div className={classes.nextToTabs}>{nextToTabs}</div>
        </Grid>
        <Panel active borderless={borderless} paddingless className={classes.root}>
          <div
            className={classNames(classes.content, noContentPadding && classes.noContentPadding)}
          >
            {selectedTab.content}
          </div>
        </Panel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Tabs);
