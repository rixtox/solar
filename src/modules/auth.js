import cookie from 'utils/cookie';

const _ = __NAMESPACE__+'/auth/',
  LOGIN = _+'LOGIN',
  LOGIN_SUCCESS = _+'LOGIN_SUCCESS',
  LOGIN_FAIL = _+'LOGIN_FAIL',
  LOGOUT = _+'LOGOUT';

const initialState = {
  token: cookie.get('token') || ''
};

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
    case LOGIN_SUCCESS:
      const { result, role } = action;
      const { token } = result;
      const user = {
        id: result.id,
        nickname: result.nickname,
        avatar: result.avatar,
        platform: result.platform
      };
      return {
        role,
        user,
        token
      };
    case LOGIN_FAIL:
      return {
        loginError: action.error
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export function login(role, email, password) {
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
  return () => {
    cookie.unset('token');
    return {type: LOGOUT};
  };
}

