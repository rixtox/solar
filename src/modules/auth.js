import cookie from 'utils/cookie';

const _ = __NAMESPACE__+'/auth/',
  LOGIN = _+'LOGIN',
  LOGIN_SUCCESS = _+'LOGIN_SUCCESS',
  LOGIN_FAIL = _+'LOGIN_FAIL',
  LOGOUT = _+'LOGOUT',
  VERIFY = _+'VERIFY',
  VERIFY_SUCCESS = _+'VERIFY_SUCCESS',
  VERIFY_FAIL = _+'VERIFY_FAIL'

const initialState = {
  role: cookie.get('role') || '',
  token: cookie.get('token') || ''
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
    case LOGIN:
      return {
        loggingIn: true
      };
    case LOGIN_SUCCESS: {
      const { result: { data }, role } = action;
      const { token } = data;
      const user = {
        id: data.id,
        nickname: data.nickname,
        avatar: data.avatar,
        platform: data.platform
      };
      saveAuth(role, token);
      return {
        role,
        user,
        token
      };
    }
    case LOGIN_FAIL:
      return {
        loginError: action.error
      };
    case LOGOUT:
      cookie.unset('role');
      cookie.unset('token');
      return {};
    case VERIFY:
      const { role, token } = action;
      return {
        role,
        token,
        verifying: true
      };
    case VERIFY_SUCCESS: {
      const { result: { data }, role, token } = action;
      const { token_status, profile: user } = data;
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
    case VERIFY_FAIL:
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
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post(`${role}/auth`, {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {type: LOGOUT};
}

export function verify({ role, token }) {
  return {
    role,
    token,
    types: [VERIFY, VERIFY_SUCCESS, VERIFY_FAIL],
    promise: (client) => client.get(`${role}/verify`, {
      params: { token }
    })
  };
}