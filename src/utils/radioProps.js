const radioProps = (props, field) => value => {
  const { handleChange } = props;
  const setValue = () => handleChange(field, value);
  return {
    value,
    onFocus: setValue,
    checked: props.fields[field].value === value
  };
};

export default radioProps;
