import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import Color from 'utils/color';
import styles from './ColorPicker.scss';
import { RGBComponent, ColorPlate } from 'components';

@CSSModules(styles)
export default class ColorPicker extends Component {
  handleColorComponentChange = (component) => (value) => {
    const color = this.props.color.use(component, value);
    this.props.onChange(color);
  }

  handleHexChange = (value) => {
    const color = new Color(value);
    if (color.isValid()) {
      this.props.onChange(color);
    }
  }

  render() {
    const { color } = this.props;
    return (
      <div styleName="color-picker">
        <div styleName="sliders">
          <RGBComponent
            color={color}
            component={'r'}
            onChange={this.handleColorComponentChange('r')} />
          <RGBComponent
            color={color}
            component={'g'}
            onChange={this.handleColorComponentChange('g')} />
          <RGBComponent
            color={color}
            component={'b'}
            onChange={this.handleColorComponentChange('b')} />
        </div>
        <div styleName="preview">
          <ColorPlate
            color={color}
            onChange={this.handleHexChange} />
        </div>
      </div>
    );
  }
}
