import { normalize, Schema, arrayOf } from 'normalizr';

const Article = new Schema('articles');

export const _ = __NAMESPACE__+'/articles/',
  GET_OWN_ARTICLES = _+'GET_OWN_ARTICLES',
  GET_OWN_ARTICLES_SUCCESS = _+'GET_OWN_ARTICLES_SUCCESS',
  GET_OWN_ARTICLES_FAIL = _+'GET_OWN_ARTICLES_FAIL',
  UPLOAD_COVER = _+'UPLOAD_COVER',
  UPLOAD_COVER_SUCCESS = _+'UPLOAD_COVER_SUCCESS',
  UPLOAD_COVER_FAIL = _+'UPLOAD_COVER_FAIL';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_OWN_ARTICLES_SUCCESS:
      const articles = normalize(action.result.data, arrayOf(Article)).entities.articles;
      return {
        ...state,
        ...articles
      };
    case UPLOAD_COVER_SUCCESS:
      const { article_id } = action;
      state[article_id].poster = action.result;
      return state;
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

export function uploadCover(file, article_id) {
  var data = new FormData();
  data.append('type', 'poster');
  data.append('file', file);
  return {
    article_id,
    types: [UPLOAD_COVER, UPLOAD_COVER_SUCCESS, UPLOAD_COVER_FAIL],
    promise: (client) => client.post(`blobs`, { data })
  };
}
