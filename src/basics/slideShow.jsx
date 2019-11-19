import React from 'react';
import PropTypes from 'prop-types';

import Spacer from '@/layout/spacer';
import Typography from '@/basics/typography';
import Grid from '@/layout/grid';

class SlideShow extends React.Component {
  static propTypes = {
    // Optional external class on the root
    className: PropTypes.string,

    // The main data structure - looks like:
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        // The "label" node
        text: PropTypes.node,

        // The gif or dom node to display
        image: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),

        // (optional) The length of this slide
        //   If not provided, defaults to the top level duration
        duration: PropTypes.number,
      }),
    ).isRequired,

    // Default slide duration, unless otherwise specified
    duration: PropTypes.number,

    // Function to call when the slideshow is complete
    complete: PropTypes.func,

    // TODO: Add loop functionality
  };

  static defaultProps = {
    // Most animations last about 4s per slide currently,
    duration: 4000,
    complete: () => null,
    className: '',
  };

  state = {
    currentSlide: 0,
  };

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentSlide } = this.state;
    if (prevState.currentSlide !== currentSlide) {
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimeout);
  }

  tick = () => {
    const { slides, duration, complete } = this.props;
    const { currentSlide } = this.state;

    // Each slide can have a custom duration, or can use the global one
    const slideDuration = slides[currentSlide].duration || duration;

    this.changeTimeout = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        this.setState({ currentSlide: currentSlide + 1 });
      } else {
        complete();
      }
    }, slideDuration);
  };

  renderImage = image => {
    // If we have a url path, put an image tag
    if (typeof image === 'string') {
      return <img src={image} alt="" />;
    }

    // Otherwise, it's probably a DOM node already
    return image;
  };

  render() {
    const { className, slides } = this.props;
    const { currentSlide } = this.state;

    const slide = slides[currentSlide];

    return (
      <Grid
        container
        alignItems="center"
        alignContent="center"
        justify="center"
        className={className}
      >
        {this.renderImage(slide.image)}

        <Spacer v={32} />

        <Typography variant="h4">{slide.text}</Typography>
      </Grid>
    );
  }
}

export default SlideShow;
