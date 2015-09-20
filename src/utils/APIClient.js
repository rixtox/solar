import url from 'url';
import axios from 'axios';

export default class APIClient {
  constructor() {
    // Define methods to construct corresponding request Promise
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return axios({
            method,
            responseType: 'json',
            transformResponse: this.transformResponse,
            ...options,
            url: this.formatUrl(path)
          });
        }
      });

    // Setup middleware to be used in Redux store middlewares
    this.middleware = ({dispatch, getState}) => {
      return next => action => {
        const { promise, types, ...rest } = action;

        // action.promise is a function returning the result of client request
        // which is expected to return a Promise
        // (client) => client[method](path, option);

        // So we ignore the async action if promise is not a function
        if (typeof promise !== 'function') {
          return next(action);
        }

        // Retreive the actions of different stages from the action object
        const [REQIEST, SUCCESS, FAILURE] = types;

        // We first dispatch the REQUEST action
        next({...rest, type: REQUEST});

        // We pass this APIClient instance into action.promise to invoke the request
        return promise(this).then(
          // Dispatch SUCCESS action
          (result) => next({...rest, result, type: SUCCESS}),
          // Dispatch FAILURE action
          (error) => next({...rest, error, type: FAILURE})
        ).catch((error) => {
          // Log any errors
          console.error('API CLIENT MIDDLEWARE ERROR:', error);
          // And dispatch errors
          next({...rest, error, type: FAILURE});
        });
      }
    };
  }

  // Transform returned data.
  // As our backend API return errors in JSON object instead of HTTP status codes
  // we need to raise errors manually event the request is successed
  transformResponse(data) {
    if (data.errors)
      throw data.errors;
    return data
  }

  // Construct full url based on pre-defined global Base Url
  formatUrl(path) {
    return url.resolve(__API_BASE_URL__, path);
  }
}
