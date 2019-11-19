import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import Notice from './notice';

const tabStyles = theme => ({
  hasNotice: {},
  fillWidth: {},
  lessPadding: {},

  root: {
    opacity: 1,
    flexGrow: 0,
    maxWidth: 302,
    minWidth: 'auto',
    color: theme.palette.grey.inputText,
    background: theme.palette.common.white,
    borderRight: [[1, 'solid', theme.palette.grey.panelBorder]],
    padding: 0,
    fontSize: 22,
    lineHeight: '32px',
    textTransform: 'none',

    [theme.breakpoints.phone]: {
      fontSize: 16,
      lineHeight: '26px',
    },

    '&$fillWidth': {
      maxWidth: 'none',
      flexGrow: 1,
    },

    '&:not($selected)': {
      background: theme.palette.grey.unselectedTab,
    },

    // The remaining rules handle the side and bottom borders on each tab.
    '&:not($hasNotice)': {
      borderTop: [[8, 'solid', theme.palette.grey.panelBorder]],
    },
    borderBottom: [[1, 'solid', theme.palette.grey.panelBorder]],

    '&$selected': {
      borderBottom: [[1, 'solid', 'transparent']],
    },

    '&:first-child': {
      borderLeft: [[1, 'solid', theme.palette.grey.panelBorder]],
    },
  },
  selected: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  labelText: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '16px 12px',
    [theme.breakpoints.up('md')]: {
      padding: '16px 24px',
    },

    '&$lessPadding': {
      padding: [[4, 24]],
    },
  },
  wrapper: {
    alignItems: 'initial',
  },
});

const Tab = props => {
  const {
    label: propsLabel,
    noticeText,
    hasNotice,
    noticeProps,
    fillWidth,
    lessPadding,
    classes: {
      labelText,
      hasNotice: hasNoticeClass,
      fillWidth: fillWidthClass,
      lessPadding: lessPaddingClass,
      ...tabClasses
    },
    ...rest
  } = props;

  const label = (
    <div>
      {hasNotice && <Notice {...noticeProps}>{noticeText}</Notice>}
      <div className={classNames(labelText, lessPadding && lessPaddingClass)}>{propsLabel}</div>
    </div>
  );

  const className = classNames({
    [hasNoticeClass]: hasNotice,
    [fillWidthClass]: fillWidth,
  });

  return <MuiTab className={className} label={label} {...rest} classes={tabClasses} />;
};

Tab.propTypes = {
  label: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  noticeText: PropTypes.string,
  hasNotice: PropTypes.bool,
  noticeProps: PropTypes.shape({}),
  fillWidth: PropTypes.bool.isRequired,
  lessPadding: PropTypes.bool,
};

Tab.defaultProps = {
  hasNotice: false,
  noticeText: null,
  noticeProps: {},
  lessPadding: false,
};

export default withStyles(tabStyles)(Tab);
