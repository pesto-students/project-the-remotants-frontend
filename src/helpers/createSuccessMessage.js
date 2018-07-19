const createSuccessMessage = (argName, arg) => {
  if (arg === undefined || arg === null) {
    return {
      success: true,
    };
  }
  return {
    success: true,
    [argName]: arg,
  };
};

export default createSuccessMessage;
