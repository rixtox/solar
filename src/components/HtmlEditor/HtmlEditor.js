import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './HtmlEditor.scss';

@CSSModules(styles)
export default class HtmlEditor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  componentWillReceiveProps(newProps) {
    if (this.props.value !== newProps.value) {
      this.state.editor.setValue(newProps.value, true);
    }
  }

  componentDidMount() {
    if(!window.wysihtml5) {
      require('wysihtml/dist/wysihtml-toolbar');
    }
    const EDITOR = window.wysihtml5;
    const textarea = React.findDOMNode(this.refs.textarea);
    const editor = new EDITOR.Editor(textarea, {
      parserRules: {
        tags: {
          strong: {},
          b:      {},
          i:      {},
          em:     {},
          br:     {},
          p:      {},
          div:    {},
          span:   {},
          ul:     {},
          ol:     {},
          li:     {},
          img: {
              check_attributes: {
                  height: "dimension",
                  width: "dimension",
                  alt: "alt",
                  src: "url"
              },
              add_class: {
                  align: "align_img"
              }
          },
          a:      {
            set_attributes: {
              target: "_blank",
              rel:    "nofollow"
            },
            check_attributes: {
              href:   "url"
            }
          }
        }
      }
    });
    this.setState({ editor });
    editor.on('load', () => {
      editor.setValue(this.props.value, true);
      editor.on('change', this.handleChange.bind(this));
    });
  }

  handleChange() {
    const value = this.state.editor.getValue();
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ target: { value } });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { editor } = this.state;
    if (editor) {
      editor.destroy();
    }
  }

  render() {
    return (
      <div styleName="html-editor" ref="textarea"/>
    );
  }
}
