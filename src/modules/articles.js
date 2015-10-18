import _ from 'underscore';
import Namespace from 'utils/namespace';
import normalize from 'utils/normalize';

const NS = 'articles';
const [$, $$] = Namespace(NS);

// default draft structure
const newDraft = (draft_id) => {
  return {
    id: Symbol(),
    name: '',
    biography: ''
  };
};

const init = {
  saved: {},  // entries saved on server
  drafts: [], // entries editing as drafts
  symbols: [] // symbols of new drafts
};

export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case $('CREATE').S:
    case $('UPDATE').S: {
      const { draft_id, result } = action;
      const entry = {
        ..._.find(state.drafts, { id: draft_id }),
        ...result // this will overwrite with server returned entry_id and other fields
      };
      return {
        ...state,
        saved: {
          ...state.saved,
          [entry.id]: entry
        },
        drafts: _.reject(state.drafts, { id: draft_id })
      };
    }
    case $('GET_ONE').S: {
      const { result } = action;
      return {
        ...state,
        saved: {
          ...state.saved,
          [result.id]: result
        }
      };
    }
    case $('GET_ALL').S:
    case $('GET_OWN').S: {
      const entries = normalize(action.result.data);
      return {
        ...state,
        saved: {
          ...state.saved,
          ...entries
        }
      };
    }
    case $('REMOVE').S: {
      const { saved_id } = action;
      return {
        ...state,
        saved: {
          ...state.saved,
          [saved_id]: undefined
        }
      };
    }
    case $$('CREATE_DRAFT'): {
      const { saved_id } = action;
      const entry = state.saved[saved_id];
      if (entry) {
        if (!_.find(state.drafts, {id: entry.id})) {
          state.drafts.push(_.clone(entry));
        }
      } else {
        const draft = newDraft();
        state.drafts.unshift(draft);
        state.symbols.push(draft.id);
      }
      return state;
    }
    case $$('UPDATE_DRAFT'): {
      const { draft_id, data } = action;
      const draft = state.drafts[draft_id];
      state.drafts[state.drafts.indexOf(draft)] = {
        ...draft,
        ...data
      };
      return state;
    }
    case $$('REMOVE_DRAFT'): {
      const { draft_id } = action;
      return {
        ...state,
        drafts: _.reject(state.drafts, { id: draft_id })
      };
    }
    case $('UPLOAD_POSTER').S: {
      const { draft_id, result: poster } = action;
      _.find(state.drafts, { id: draft_id }).poster = poster;
      return state;
    }
    default:
      return state;
  }
}

export function create(draft_id, data) {
  return {
    draft_id,
    types: $('CREATE'),
    promise: (client) => client.post(`${NS}`, { data })
  };
}

export function update(draft_id, data) {
  return {
    draft_id,
    types: $('UPDATE'),
    promise: (client) => client.put(`${NS}/${draft_id}`, { data })
  };
}

export function getOne(saved_id) {
  return {
    types: $('GET_ONE'),
    promise: (client) => client.get(`${NS}/${saved_id}`)
  };
}

export function getAll() {
  return {
    types: $('GET_ALL'),
    promise: (client) => client.get(`${NS}`)
  };
}

export function getOwn() {
  return {
    types: $('GET_OWN'),
    promise: (client) => client.get('editors/current/articles')
  };
}

export function remove(saved_id) {
  return {
    types: $('REMOVE'),
    promise: (client) => client.delete(`${NS}/${saved_id}`)
  };
}

export function createDraft(saved_id) {
  return {
    saved_id,
    type: $$('CREATE_DRAFT')
  };
}

export function updateDraft(draft_id, data) {
  return {
    draft_id, data,
    type: $$('UPDATE_DRAFT')
  };
}

export function removeDraft(saved_id) {
  return {
    saved_id,
    type: $$('REMOVE_DRAFT')
  };
}

export function uploadPoster(file, draft_id) {
  var data = new FormData();
  data.append('type', 'poster');
  data.append('file', file);
  return {
    draft_id,
    types: $('UPLOAD_POSTER'),
    promise: (client) => client.post('blobs', { data })
  };
}
