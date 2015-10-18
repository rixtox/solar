import _ from 'underscore';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';

import { ArticlePreview, ArticleEditor, ArticleForm } from 'components';
import styles from './Editors.scss';
import fetchData from 'utils/fetchData';
import { getOwn, uploadPoster } from 'modules/articles';

@connect(
    state => ({
      auth: state.auth,
      articles: state.articles
    }),
    dispatch => bindActionCreators({
      getOwn,
      uploadPoster
    }, dispatch))
@CSSModules(styles, {allowMultiple: true})
@fetchData()
export default class Editors extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    auth: PropTypes.shape({user: PropTypes.object.isRequired})
  }

  state = {
    init: true
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.setState(this.computeNewState());
  }

  componentDidMount() {
    this.setState({
      init: false,
      ...this.computeNewState()
    });
  }

  computeNewState = () => {
    const saved_articles = this.getSavedArticles();
    const current_article = this.getCurrentArticle();
    const current_article_id = current_article &&
          current_article.id;
    return {
      saved_articles,
      current_article,
      current_article_id
    };
  }

  fetchData() {
    this.props.getOwn();
  }

  handleSelectArticle = (id) => {
    return () => {
      this.props.history.pushState(null, `/editors/articles/${id}`);
    };
  }

  handleUploadPoster = (file) => {
    this.props.uploadPoster(file, this.getCurrentArticleId());
  }

  getCurrentArticleId = () => {
    const { articles: { symbols }, params } = this.props;
    if (!params.article_id) return;
    const matches = params.article_id.match(/^draft-(\d+)$/);
    return matches ? symbols[matches[1]] : parseInt(params.article_id);
  }

  getCurrentArticle = () => {
    const { articles: { saved, drafts } } = this.props;
    const current_article_id = this.getCurrentArticleId();
    if (!current_article_id) return;
    return _.find(drafts, { id: current_article_id }) ||
      saved[current_article_id];
  }

  getSavedArticles = () => {
    const { auth: { user }, articles } = this.props;
    const own_articles = _.filter(
      _.values(articles.saved),
      article => article.owner.id === user.id
        && !_.find(articles.drafts, { id: article.id })
    );
    /* Articles Sort Order
     - saved drafts
     - reviewing
     - published
    */
    return [].concat(
      _.sortBy(
        _.filter(own_articles, {status: 'draft'}),
        article => (new Date(article.updated_at)).valueOf()
      ),
      _.sortBy(
        _.filter(own_articles, {status: 'review_pending'}),
        article => (new Date(article.updated_at)).valueOf()
      ),
      _.sortBy(
        _.filter(own_articles, {status: 'published'}),
        article => (new Date(article.published_at)).valueOf()
      )
    );
  }

  renderArticleItem = (current_article_id) => (article) => {
    let status_left;
    if (article.status === 'draft') {
      status_left = <div styleName="article-item-status-left draft">Draft</div>;
    } else {
      status_left = <div styleName="article-item-status-left published">Published at {(new Date(article.published_at)).toLocaleDateString()}</div>;
    }
    return (
      <div styleName={`article-item${current_article_id == article.id ? ' selected' : ''}`} onClick={this.handleSelectArticle(article.id)} key={article.id}>
        <div styleName="article-item-title">{article.title}</div>
        <div styleName="article-item-status">
          { status_left }
          <div styleName="article-item-status-right">{article.likes_count} Likes</div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.init || !this.props.auth.user) {
      return <noscript/>;
    }
    const { auth: { user }, articles, logout } = this.props;
    const {
      saved_articles,
      current_article,
      current_article_id
    } = this.state;

    const draft_articles = articles.drafts;

    let article_display, article_form;
    if (current_article) {
      if (current_article.status === 'draft') {
        article_display = <ArticleEditor article={current_article} handleUploadPoster={ this.handleUploadPoster }/>;
        article_form = <ArticleForm article={current_article}/>
      } else {
        article_display = <ArticlePreview article={current_article}/>;
        article_form = <ArticleForm article={current_article}/>;  // TODO: remove editable fields
      }
    } else {
      article_display = <noscript/>;
      article_form = <noscript/>;
    }

    let article_items = [].concat(
      draft_articles.map(this.renderArticleItem(current_article_id)),
      saved_articles.map(this.renderArticleItem(current_article_id))
    );

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
          {article_display}
        </div>
        <div styleName="right-column">
          {article_form}
        </div>
      </div>
    );
  }
}
