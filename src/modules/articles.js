import Namespace from 'utils/namespace';
import { normalize, Schema, arrayOf } from 'normalizr';

const NS = 'articles';
const [$, $$] = Namespace(NS);
const Article = new Schema(NS);

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case $('GET_OWN').S:
      const articles = normalize(action.result.data, arrayOf(Article)).entities.articles;
      return {
        ...state,
        ...articles
      };
    case $('UPLOAD_COVER').S:
      const { article_id } = action;
      state[article_id].poster = action.result;
      return state;
    default:
      return state;
  }
}

export function getOwnArticles() {
  return {
    types: $('GET_OWN'),
    promise: (client) => client.get('editors/current/articles')
  };
}

export function uploadCover(file, article_id) {
  var data = new FormData();
  data.append('type', 'poster');
  data.append('file', file);
  return {
    article_id,
    types: $('UPLOAD_COVER'),
    promise: (client) => client.post('blobs', { data })
  };
}
