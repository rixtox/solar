import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './RGBComponent.scss';
import { RGBSlider } from 'components';

@CSSModules(styles)
export default class RGBComponent extends Component {
  render() {
    const { color, component } = this.props;
    const value = color.get(component);
    return (
      <div styleName="slider-group">
        <RGBSlider
        color={color}
        styleName="slider"
        component={component}
        onChange={this.props.onChange} />
        <input
          min="0"
          step="1"
          max="255"
          type="number"
          value={Math.round(value)}
          styleName="component-value"
          onChange={(e) => this.props.onChange(e.target.value)} />
      </div>
    );
  }
}
