import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import Color from 'utils/color';
import styles from './ArticleForm.scss';
import { ColorPicker } from 'components';

@CSSModules(styles)
export default class ArticleForm extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  state = {
    theme_color: new Color(this.props.article.theme_color)
  }

  onThemeColorChange = (theme_color) => {
    this.setState({ theme_color });
  }

  render() {
    const { article } = this.props;
    const { theme_color } = this.state;
    return (
      <form styleName="form">
        <div styleName="top-bar">
          <div styleName="top-bar-button">Save</div>
          <div styleName="top-bar-button">Publish</div>
          <div styleName="top-bar-button">Delete</div>
        </div>
        <div styleName="inner">
          <div styleName="control-group">
            <div styleName="label">Title</div>
            <input styleName="input" value={article.title}/>
          </div>
          <div styleName="control-group">
            <div styleName="label">Tags</div>
            <input styleName="input" value={article.tags.map(tag => tag.name).join(', ')}/>
          </div>
          <div styleName="control-group">
            <div styleName="label">Theme Color</div>
            <ColorPicker color={theme_color} onChange={this.onThemeColorChange} />
          </div>
          { article.authorships.length > 0 ? (
              <div styleName="control-group">
                <div styleName="label">Authors</div>
                <div styleName="authorship-list">{
                  article.authorships.map((authorship, index) =>
                    <div key={authorship.id} styleName="authorship">
                      <img src={authorship.credit_holder.avatar.urls.large} styleName="authorship-avatar" />
                      <div styleName="author-info">
                        <div styleName="author-info-name">{authorship.credit_holder.name}</div>
                        <div styleName="author-info-biography">{authorship.credit_holder.biography}</div>
                        <div styleName="author-info-title">{authorship.title}</div>
                      </div>
                      <div styleName="authorship-controls">
                        <div styleName={index === 0 ? 'authorship-is-primary' : 'authorship-make-primary'}>Primary</div>
                        <div styleName="authorship-remove">Remove</div>
                      </div>
                    </div>
                  )
                }</div>
              </div>
            ) : <noscript/>
          }
        </div>
      </form>
    );
  }
}
