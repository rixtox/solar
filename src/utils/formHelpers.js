export const radioProps = (props, field) => value => {
  const { fields: {[field]: fieldProps}, handleChange } = props;
  const setValue = () => handleChange(field, value);
  return {
    ...fieldProps,
    value,
    onFocus: setValue,
    checked: fieldProps.value === value
  };
};
