import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Typography from './typography';

const numberHeight = 30;

const styles = theme => ({
  number: {
    width: 30,
    borderRadius: 4,
    height: numberHeight,
    background: theme.palette.common.white,
  },
  colon: {
    margin: [[0, 2]],
    height: numberHeight,
  },
  part: {
    fontSize: 8,
    marginTop: 2,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
});

class Countdown extends React.Component {
  static propTypes = {
    /** The function to run when the countdown is complete */
    onFinish: PropTypes.func,
    /** A millisecond timestamp of when to end the timer */
    end: PropTypes.number.isRequired,
    /** @ignore */
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    onFinish: () => {},
  };

  constructor(...args) {
    super(...args);

    this.state = {};
    this.tick(values => {
      this.state = values;
    })();
  }

  componentDidMount() {
    this.timer = setInterval(this.tick(this.setState.bind(this)), 100);
  }

  componentWillUnmount() {
    this.stop();
  }

  tick = setter => () => {
    const { end, onFinish } = this.props;
    const currentTime = Date.now();

    const seconds = Math.max(0, Math.floor((end - currentTime) / 1000));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const finished = seconds <= 0;

    if (finished) {
      this.stop();
      onFinish();
    }

    const mins = minutes - hours * 60;
    const secs = seconds - hours * 60 * 60 - mins * 60;

    setter({
      mins,
      secs,
      hours,
      finished,
    });
  };

  stop() {
    clearInterval(this.timer);
  }

  renderDigit = part => {
    const { classes } = this.props;
    const { [part]: value } = this.state;

    return (
      <Grid item align="center">
        <Typography variant="h6" component="div" className={classes.number}>
          {String(value).padStart(2, '0')}
        </Typography>

        <div className={classes.part}>{part}</div>
      </Grid>
    );
  };

  renderColon = () => {
    const { classes } = this.props;

    return (
      <Typography item variant="h6" component={Grid} className={classes.colon}>
        :
      </Typography>
    );
  };

  render() {
    return (
      <Grid container>
        {this.renderDigit('hours')}
        {this.renderColon()}
        {this.renderDigit('mins')}
        {this.renderColon()}
        {this.renderDigit('secs')}
      </Grid>
    );
  }
}

export default withStyles(styles)(Countdown);
