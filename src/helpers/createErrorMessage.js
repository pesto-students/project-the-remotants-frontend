const createErrorMessage = message => ({
  success: false,
  errors: {
    name: message,
  },
});

export default createErrorMessage;
