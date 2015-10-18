import React from 'react';

let decoratorConstructor,
    functionConstructor;

// A Boolean version of React.PropType.validate()
export let validate = (propTypes, props, className) => {
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error;
      try {
        error = propTypes[propName](props, propName, className, 'prop');
      } catch (ex) {
        error = ex;
      }
      if (error) {
        return false;
      }
    }
  }
  return true;
};

functionConstructor = (Component) => {
  let decoratedClass;

  if (!Component.prototype.componentDidUpdate) {
    Component.prototype.componentDidUpdate = () => {};
  }
  if (!Component.prototype.componentWillMount) {
    Component.prototype.componentWillMount = () => {};
  }

  let didRender = false;
  let didMount = false;

  [ 'render',
    'getInitialState',
    'getDefaultProps',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
  ].forEach((proto) => {
    (compProto) => {
      if (typeof compProto === 'function') {
        Component.prototype[proto] = function() {
          const thisProto = this['_' + proto];
          let thisProtoReturn;
          if (typeof thisProto === 'function') {
            thisProtoReturn = thisProto.apply(this, arguments);
          }
          if (this._validateData(true)) {
            didRender = proto === 'render' || didRender;
            return compProto.apply(this, arguments)
          } else {
            return thisProtoReturn;
          }
        };
      }
    }(Component.prototype[proto]);
  });

  decoratedClass = class extends Component {
    static propTypes = {}

    // Fire data fetching
    _fetchData() {
      if (typeof super.fetchData === 'function') {
        return super.fetchData();
      }
    }

    // Validate the instance's props with its static propTypes schema
    _validateData(defaultValue = true) {
      if (typeof super.validateData === 'function') {
        return super.validateData();
      }
      if (Component.propTypes) {
        return validate(
          Component.propTypes,
          this.props,
          Component.displayName || Component.name
        );
      }
      return defaultValue;
    }

    _componentDidUpdate = () => {
      if (didRender && !didMount) {
        didMount = true;
        this.componentDidMount();
      }
    }

    _componentWillMount = () => {
      this._fetchData();
    }

    _render = () => <noscript/>;
  };

  if (Component.displayName) {
    decoratedClass.displayName = Component.displayName;
  } else {
    decoratedClass.displayName = Component.name;
  }

  return decoratedClass;
};

decoratorConstructor = () => {
  return (Component) => {
    return functionConstructor(Component);
  };
};

export default (...args) => {
  if (typeof args[0] === 'function') {
    return functionConstructor(args[0]);
  } else {
    return decoratorConstructor();
  }
};
