import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { DatePicker as MuiDatePicker } from 'material-ui-pickers';

import Textbox, { topMargin } from './textbox';

// This is based off of the IconButton fontSize
//   and padding for a 'medium' sized button.
const iconHeight = 48;

const styles = theme => ({
  root: {
    display: 'inline',
    position: 'relative',
  },
  icon: {
    right: 15,
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: theme.zIndex.above,
    top: topMargin + theme.layout.inputHeight / 2 - iconHeight / 2,
  },
  button: {
    color: theme.palette.blue.textboxFocus,
  },
  backdrop: {
    backgroundColor: theme.palette.grey.modalBackground,
  },
});

const CursorTextbox = withStyles({
  input: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
  inputRoot: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
})(Textbox);

class DatePicker extends React.PureComponent {
  static propTypes = {
    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
  };

  render() {
    const { classes, ...props } = this.props;
    const { disabled } = props;

    return (
      <div className={classes.root}>
        <IconButton
          color="primary"
          disabled={disabled}
          classes={{
            root: classes.icon,
            colorPrimary: classes.button,
          }}
        >
          <CalendarIcon />
        </IconButton>

        <MuiDatePicker
          autoOk
          onlyCalendar
          format="MMMM do yyyy"
          disableOpenOnEnter={false}
          TextFieldComponent={CursorTextbox}
          {...props}
          DialogProps={{
            disableAutoFocus: true,
            disableRestoreFocus: true,

            BackdropProps: {
              classes: {
                root: classes.backdrop,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);
