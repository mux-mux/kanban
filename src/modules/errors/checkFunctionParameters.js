function checkFunctionParameters(...rest) {
  rest.forEach((param) => {
    if (param == null) {
      const callerName = getCallerFunctionName();
      throw new Error(`Function ${callerName || 'unknown'} called with no required argument value`);
    }
  });
}

function getCallerFunctionName() {
  try {
    const stack = new Error().stack;
    const stackLines = stack.split('\n');
    if (stackLines.length >= 3) {
      return stackLines[5];
    }
  } catch (err) {
    return null;
  }
  return null;
}

export default checkFunctionParameters;
