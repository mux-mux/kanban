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
      const callerLine = stackLines[5];
      const match = callerLine.match(/at (\S+)/);
      return match ? match[1] : null;
    }
  } catch (err) {
    return null;
  }
  return null;
}

export default checkFunctionParameters;
