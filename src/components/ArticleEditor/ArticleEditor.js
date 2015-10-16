import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './ArticleEditor.scss';
import { HtmlEditor } from 'components';

@CSSModules(styles)
export default class ArticleEditor extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    const { article } = this.props;
    var author;
    try {
      author = article.authorships[0].credit_holder;
    } catch (e) {
      author = {
        name: '',
        avatar: {
          urls: {
            large: ''
          }
        }
      };
    }
    if (!article.poster) {
      article.poster = {urls: {large: ''}};
    }
    if (!article.theme_color) {
      article.theme_color = "#ffffff";
    }
    return (
      <div styleName="editor">
        <div styleName="editor-control-bar">
          <label styleName="editor-control">
            <input type="file" styleName="editor-control-file" accept="image/x-png, image/jpeg" onChange={event => {
              this.props.handleUploadCover(event.target.files[0]);
            }}/>
            <span>Cover</span>
          </label>
          <div styleName="editor-control">B</div>
          <div styleName="editor-control">C</div>
          <div styleName="editor-control">D</div>
        </div>
        <div styleName="editor-content">
          <div styleName="editor-content-poster" style={{color: article.theme_color, backgroundImage: `url(${article.poster.urls.large})`}}>
            <div styleName="editor-content-info">
              <div styleName="editor-content-author">
                <div styleName="editor-content-author-avatar" style={{borderColor: article.theme_color, backgroundImage: `url(${author.avatar.urls.large})`}} />
                <div styleName="editor-content-author-name">{author.name}</div>
              </div>
              <div styleName="editor-content-title-box" style={{borderColor: article.theme_color}}>
                <div styleName="editor-content-title">{article.title}</div>
                <div styleName="editor-content-platform">from {article.platform.name}</div>
              </div>
            </div>
          </div>
          <HtmlEditor value={article.content}/>
        </div>
      </div>
    );
  }
}
