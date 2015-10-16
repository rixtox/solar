import cookie from 'utils/cookie';
import Namespace from 'utils/namespace';
import { PropTypes as Types } from 'react';

const NS = 'auth';
const [$, $$] = Namespace(NS);

const initialState = {
  role: cookie.get('role') || '',
  token: cookie.get('token') || ''
};

export let Shape = {
  role: Types.string.isRequired,
  token: Types.string.isRequired,
  user: Types.shape({
    id: Types.number.isRequired,
    nickname: Types.string,
    platform: Types.object
  })
};

function saveAuth(role, token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'role',
    value: role,
    expires
  });
  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case $('LOGIN').R:
      return {
        loggingIn: true
      };
    case $('LOGIN').S: {
      const { result: { token, id, nickname, avatar, platform }, role } = action;
      const user = {
        id: id,
        nickname: nickname,
        avatar: avatar,
        platform: platform
      };
      saveAuth(role, token);
      return {
        role,
        user,
        token
      };
    }
    case $('LOGIN').F:
      return {
        loginError: action.error
      };
    case $$('LOGOUT'):
      cookie.unset('role');
      cookie.unset('token');
      return { role: '', token: '', user: {} };
    case $('VERIFY').R:
      const { role, token } = action;
      return {
        role,
        token,
        verifying: true
      };
    case $('VERIFY').S: {
      const { result: { token_status, profile: user }, role, token } = action;
      if (token_status === 'valid') {
        return {
          role,
          user,
          token
        };
      } else {
        logout();
        return {};
      }
    }
    case $('VERIFY').F:
      return {
        verifyError: action.error
      };
    default:
      return state;
  }
}

export function login({ role, email, password }) {
  return {
    role,
    types: $('LOGIN'),
    promise: (client) => client.post(`${role}/auth`, {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {type: $$('LOGOUT')};
}

export function verify({ role, token }) {
  return {
    role,
    token,
    types: $('VERIFY'),
    promise: (client) => client.get(`${role}/verify`, {
      params: { token }
    })
  };
}
