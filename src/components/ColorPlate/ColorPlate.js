import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import Color from 'utils/color';
import styles from './ColorPlate.scss';

@CSSModules(styles)
export default class ColorPlate extends Component {
  updateStyles = ({ color }) => {
    this.refs.colorDisplay.style.backgroundColor = color.toHexString();
  }

  updateValue = (value) => {
    this.refs.value.value = value;
  }

  componentDidMount = () => {
    this.updateStyles(this.props);
    this.updateValue(this.props.color.toHexString());
  }

  onChange = (e) => {
    const { target: { value } } = e;
    const { onChange } = this.props;
    const color = new Color(value);
    if (color.isValid()) {
      onChange && onChange(color.toString());
    }
    this.updateValue(value);
  }

  state = {};

  componentWillReceiveProps = (nextProps) => {
    this.updateStyles(nextProps);
    const color = new Color(this.refs.value.value);
    if (!color.hexEquals(nextProps.color) ) {
      this.updateValue(nextProps.color.toHexString());
    }
  }

  shouldComponentUpdate = () => false;

  render() {
    const { color } = this.props;
    return (
      <div
        ref="colorPlate"
        styleName="color-plate">
        <div
          ref="colorDisplay"
          styleName="color-display" />
        <input
          ref="value"
          styleName="color-value"
          onChange={this.onChange} />
      </div>
    );
  }
}
