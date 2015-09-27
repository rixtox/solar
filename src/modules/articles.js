import { normalize, Schema, arrayOf } from 'normalizr';

const Article = new Schema('articles');

export const _ = __NAMESPACE__+'/articles/',
  GET_OWN_ARTICLES = _+'GET_OWN_ARTICLES',
  GET_OWN_ARTICLES_SUCCESS = _+'GET_OWN_ARTICLES_SUCCESS',
  GET_OWN_ARTICLES_FAIL = _+'GET_OWN_ARTICLES_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_OWN_ARTICLES_SUCCESS:
      const articles = normalize(action.result.data, arrayOf(Article)).entities.articles;
      return {
        ...state,
        ...articles
      };
    default:
      return state;
  }
}

export function getOwnArticles() {
  return {
    types: [GET_OWN_ARTICLES, GET_OWN_ARTICLES_SUCCESS, GET_OWN_ARTICLES_FAIL],
    promise: (client) => client.get('editors/current/articles')
  };
}
