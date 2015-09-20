import { canUseDOM } from 'react/lib/ExecutionEnvironment';

const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    // In terms of server executions such as tests
    if (!canUseDOM) { return; }

    if (expires instanceof Date) {
      expires = expires.toUTCString();
    }

    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${expires}`
    ].join(';');
  },

  unset(name) {
    cookie.set({ name, expires: new Date(0) });
  },

  get(name) {
    var re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)'
    ].join(''));

    var matches = document.cookie.match(re);

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

export default cookie;
