import _ from 'lodash';
import DOMPurify from 'dompurify';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';

import styles from './Editors.scss';
import fetchData from 'utils/fetchData';
import { getOwnArticles } from 'modules/articles';

@connect(
    state => ({
      auth: state.auth,
      articles: _.filter(state.articles, article => article.owner.id === state.auth.user.id)
    }),
    dispatch => bindActionCreators({
      getOwnArticles
    }, dispatch))
@fetchData()
@CSSModules(styles, {allowMultiple: true})
export default class Editors extends Component {
  static propTypes = {
    auth: PropTypes.shape({user: PropTypes.object.isRequired})
  }

  fetchData() {
    this.props.getOwnArticles();
  }

  createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    };
  }

  handleSelectArticle(id) {
    return () => {
      this.props.history.pushState(null, `/editors/articles/${id}`);
    };
  }

  render() {
    const { articles, auth: { user }, logout, params } = this.props;
    const article_id = parseInt(params.article_id);
    var article_content;
    const article = _.find(articles, {id: article_id});
    if (article) {
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
      article_content = (
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
          <div styleName="editor-content-article" dangerouslySetInnerHTML={this.createMarkup(article.content)}/>
        </div>
      );
    }
    const article_item = article => {
      var status_left;
      if (article.status === 'draft') {
        status_left = <div styleName="article-item-status-left draft">Draft</div>;
      } else {
        status_left = <div styleName="article-item-status-left published">Published at {(new Date(article.published_at)).toLocaleDateString()}</div>;
      }
      return (
        <div styleName={`article-item${article_id == article.id ? ' selected' : ''}`} onClick={this.handleSelectArticle(article.id)} key={article.id}>
          <div styleName="article-item-title">{article.title}</div>
          <div styleName="article-item-status">
            { status_left }
            <div styleName="article-item-status-right">{article.likes_count} Likes</div>
          </div>
        </div>
      );
    }
    var article_items = [].concat(
      _.sortBy(
        _.filter(articles, {status: 'draft'}),
        article => (new Date(article.updated_at)).valueOf()),
      _.sortBy(
        _.filter(articles, {status: 'review_pending'}),
        article => (new Date(article.updated_at)).valueOf()),
      _.sortBy(
        _.filter(articles, {status: 'published'}),
        article => (new Date(article.published_at)).valueOf()))
    .map(article_item);
    return (
      <div styleName="wrapper">
        <div styleName="left-column">
          <div styleName="profile-bar">
            <img src={user.avatar.urls.large} styleName="profile-avatar" />
            <div styleName="profile-name">{user.nickname}</div>
            <div styleName="profile-controls">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <div styleName="nav-bar">
            <div styleName="nav-bar-list">
              <div styleName="nav-bar-item">Articles</div>
            </div>
            <div styleName="nav-bar-controls">
              <div styleName="nav-bar-control">Add</div>
            </div>
          </div>
          <div styleName="article-list">{ article_items }</div>
        </div>
        <div styleName="middle-column">
          <div styleName="editor-control-bar">
            <div styleName="editor-control">A</div>
            <div styleName="editor-control">B</div>
            <div styleName="editor-control">C</div>
            <div styleName="editor-control">D</div>
          </div>
          {article_content}
        </div>
        <div styleName="right-column"></div>
      </div>
    );
  }
}
