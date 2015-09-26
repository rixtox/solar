import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';

import styles from './Editors.scss';
import fetchData from 'utils/fetchData';
import { getOwnArticles } from 'modules/editors';

@connect(
    state => ({
      profile: state.auth.user
    }),
    dispatch => bindActionCreators({
      getOwnArticles
    }, dispatch))
@fetchData()
@CSSModules(styles)
export default class Home extends Component {
  static propTypes = {
    editors: PropTypes.shape({
      articles: PropTypes.array.isRequired
    })
  }

  fetchData() {
    this.props.getOwnArticles(this.props.profile.id);
  }

  render() {
    return (
      <div>Success!</div>
    );
  }
}
