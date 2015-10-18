import Tinycolor from 'tinycolor2';

export default class Color extends Tinycolor {
  clone = () => new Color(this.toString());
  get = (component) => this['_' + component];
  set = (component, value) => {
    this['_' + component] = value;
    return this;
  }
  hexEquals = (color) => {
    const str1 = (new Color(this.toRgb())).toHex8();
    const str2 = (new Color(color.toRgb())).toHex8();
    return str1 === str2;
  }
  use = (component, value) => this.clone().set(component, value);
}
