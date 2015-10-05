import DOMPurify from 'dompurify';
import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './ArticlePreview.scss';

@CSSModules(styles, {allowMultiple: true})
export default class ArticlePreview extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    };
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
    return (
      <div styleName="preview">
        <div styleName="preview-content">
          <div styleName="preview-content-poster" style={{color: article.theme_color, backgroundImage: `url(${article.poster.urls.large})`}}>
            <div styleName="preview-content-info">
              <div styleName="preview-content-author">
                <div styleName="preview-content-author-avatar" style={{borderColor: article.theme_color, backgroundImage: `url(${author.avatar.urls.large})`}} />
                <div styleName="preview-content-author-name">{author.name}</div>
              </div>
              <div styleName="preview-content-title-box" style={{borderColor: article.theme_color}}>
                <div styleName="preview-content-title">{article.title}</div>
                <div styleName="preview-content-platform">from {article.platform.name}</div>
              </div>
            </div>
          </div>
          <div styleName="preview-content-article" dangerouslySetInnerHTML={this.createMarkup(article.content)}/>
        </div>
      </div>
    );
  }
}
