const validateInput = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!values.email.match(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
    errors.email = 'Email entered is not valid';
  }
  if (!values.password) {
    errors.password = 'This field is required';
  }
  return errors;
};

const validations = {
  validateInput,
};
export default validations;
