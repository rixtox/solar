import _ from 'lodash';
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
@CSSModules(styles)
export default class Editors extends Component {
  static propTypes = {
    auth: PropTypes.shape({user: PropTypes.object.isRequired})
  }

  fetchData() {
    this.props.getOwnArticles();
  }

  render() {
    const { articles, auth: { user }, logout } = this.props;
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
          <div styleName="article-list">
          {
            articles.map(article => (
              <div styleName="article-item">
                <div styleName="article-item-title">{article.title}</div>
                <div styleName="article-item-status">
                  <div styleName="article-item-status-left">{article.status}</div>
                  <div styleName="article-item-status-right">{article.likes_count} Likes</div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <div styleName="middle-column"></div>
        <div styleName="right-column"></div>
      </div>
    );
  }
}
