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

  decoratedClass = class extends Component {
    // Fire data fetching
    fetchData() {
      if (typeof super.fetchData === 'function') {
        return super.fetchData();
      }
    }

    // Validate the instance's props with its static propTypes schema
    validateData(defaultValue = true) {
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

    componentWillMount(...args) {
      this.fetchData();
      if (typeof super.componentWillMount === 'function') {
        return super.componentWillMount(...args);
      }
    }

    render () {
      let data_valid = this.validateData(true);
      if (data_valid) {
        let renderResult;

        renderResult = super.render();

        if (renderResult) {
          return renderResult;
        }
      }
      return <noscript/>;
    }
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
