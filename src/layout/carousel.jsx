import React from 'react';
import Slider from 'react-slick';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CarouselArrowRightIcon from '@a/images/carousel-arrow-right.svg';

// We pass react-slick custom arrows with a wrapper element
//   so that the controls are always visible in the viewport
const arrowStyles = theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '100%',
    maxWidth: '100vw',
    zIndex: theme.zIndex.above,
  },
});

class Arrow extends React.PureComponent {
  render() {
    const { className, style, onClick, classes } = this.props;

    // Ignoring this linting rule because slick-slider
    //   is already listening for key events.
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div className={classes.root}>
        <div className={className} style={style} onClick={onClick} role="button" tabIndex="0" />
      </div>
    );
    /* eslint-enable */
  }
}

Arrow.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const StyledArrow = withStyles(arrowStyles)(Arrow);

// These styles are needed for the react-slick carousel to function
const reactSlickStyles = {
  '& .slick-slider': {
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    userSelect: 'none',
    touchAction: 'pan-y',
    webkitTapHighlightColor: 'transparent',
  },

  '& .slick-list': {
    position: 'relative',
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'visible',
    margin: 0,
    padding: 0,
  },

  '& .slick-slide, .slick-slide div, .slick-slide div>*': {
    outline: 'none !important',
  },

  '& .slick-list.dragging': {
    cursor: 'pointer',
  },

  '& .slick-slider .slick-track': {
    transform: 'translate3d(0, 0, 0)',
  },

  '& .slick-slider .slick-list': {
    transform: 'translate3d(0, 0, 0)',
  },

  '& .slick-track': {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  '& [dir="rtl"] .slick-track': {
    flexDirection: 'rowReverse',
  },

  '& .slick-loading .slick-track': {
    visibility: 'hidden',
  },

  '& .slick-slide': {
    display: 'none',
    minHeight: 1,

    '&>div': {
      height: '100%',
    },
  },

  '& .slick-slide.dragging img': {
    pointerEvents: 'none',
  },

  '& .slick-initialized .slick-slide': {
    display: 'block',
  },

  '& .slick-loading .slick-slide': {
    visibility: 'hidden',
  },

  '& .slick-vertical .slick-slide': {
    display: 'block',
    height: 'auto',
    border: '1px solid transparent',
  },

  '& .slick-arrow.slick-hidden': {
    display: 'none',
  },

  '& .slick-arrow': {
    position: 'absolute',
    transform: 'translate(0, -50%)',
    fontSize: 0,
    height: 48,
    width: 48,
    background: `url(${CarouselArrowRightIcon}) center/contain no-repeat`,
    color: 'transparent',
    border: 'none',
    outline: 'none',

    '&:hover': {
      cursor: 'pointer',
    },
  },

  '& .slick-prev': {
    left: 16,
  },

  '& .slick-next': {
    right: 16,
    background: `url(${CarouselArrowRightIcon}) center/contain no-repeat`,
    transform: 'translate(0, -50%) rotate(180deg)',
  },
};

const styles = {
  root: reactSlickStyles,
};

const Carousel = ({ classes, children, settings, className }) => {
  const defaultSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: '16px',
    slidesToShow: 1,
    speed: 500,
    nextArrow: <StyledArrow />,
    prevArrow: <StyledArrow />,
  };
  return (
    <div className={classNames(classes.root, className)}>
      <Slider {...Object.assign({}, defaultSettings, settings)}>{children}</Slider>
    </div>
  );
};

Carousel.propTypes = {
  /** @ignore */
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,

  /** Settings passed to react-slick */
  settings: PropTypes.shape({}),

  /** root className */
  className: PropTypes.string,
};

Carousel.defaultProps = {
  settings: {},
  className: null,
};

export default withStyles(styles)(Carousel);
