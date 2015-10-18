import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './RGBSlider.scss';

@CSSModules(styles)
export default class RGBSlider extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    component: PropTypes.oneOf(['r', 'g', 'b'])
  }

  state = {
    value: this.props.color.get(this.props.component)
  }

  getDimensions = () => {
    const knobRect = this.refs.knob.getBoundingClientRect();
    const fillRect = this.refs.fill.getBoundingClientRect();
    const minX = fillRect.left - knobRect.width * 0.2;
    const maxX = fillRect.right - knobRect.width * 0.8;
    const lengthX = maxX - minX;
    return { minX, maxX, lengthX, knobRect, fillRect };
  }

  positionToValue = (posX) => {
    const { minX, maxX, lengthX } = this.getDimensions();
    if (posX > maxX) {
      posX = maxX;
    } else if (posX < minX) {
      posX = minX;
    }
    return 255 * (posX - minX) / lengthX;
  }

  valueToLeft = (value) => {
    const { minX, lengthX, fillRect } = this.getDimensions();
    return ((minX + (value * lengthX) / 255) - fillRect.left) + 'px';
  }

  handleNoop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleMouseDown = (e) => {
    const { knobRect } = this.getDimensions();
    if (e.clientX < knobRect.left || e.clientX > knobRect.right) {
      this.state.knobMouseOffset = - knobRect.width / 2;
      this.handleDrag(e);
    } else {
      this.state.knobMouseOffset = knobRect.left - e.clientX;
    }
    this.handleDragStart();
  }

  handleDragStart = () => {
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDrag = (e) => {
    const { onChange } = this.props;
    const { knobMouseOffset } = this.state;
    let posX = e.clientX + knobMouseOffset;
    this.state.value = this.positionToValue(posX);
    this.updateKnob();
    onChange && onChange(this.state.value);
  }

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
  }

  updateKnob = (value) => {
    this.refs.knob.style.left = this.valueToLeft(this.state.value);
  }

  updateFill = ({ color, component }) => {
    this.refs.fill.style.background = `linear-gradient(to right, ${color.use(component, 0).toHexString()} 0%, ${color.use(component, 255).toHexString()} 100%)`;
  }

  componentDidMount = () => {
    this.updateKnob();
    this.updateFill(this.props);
  }

  componentWillReceiveProps = (nextPropts) => {
    this.updateFill(nextPropts);
    const value = nextPropts.color.get(nextPropts.component);
    if (value !== this.state.value) {
      this.state.value = value;
      this.updateKnob();
    }
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <div
        ref="slider"
        styleName="rgb-slider"
        onClick={this.handleNoop}
        onMouseDown={this.handleMouseDown}>
        <div
          ref="fill"
          styleName="fill" />
        <div
          ref="knob"
          styleName="knob" />
      </div>
    );
  }
}
