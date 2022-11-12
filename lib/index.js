function getPathVars(path) {
  var pathVars = [];
  var match;

  while ((match = pathVarsRe.exec(path)) !== null) {
    pathVars.push(match[1]);
  }

  return pathVars;
}

function parse(pathPattern) {
  var splitByQuestionMark = pathPattern.split("?");

  return {
    withoutParams: splitByQuestionMark[0],
    params:
      splitByQuestionMark.length > 1 ? splitByQuestionMark[1].split("|") : [],
    pathVars: getPathVars(pathPattern),
  };
}

function uriJoin(a, b) {
  if (!a.endsWith("/")) {
    a = a + "/";
  }

  if (b.startsWith("/")) {
    b = b.substr(1);
  }

  return a + b;
}

function getParseJsonFn(cb) {
  return function (error, message, body) {
    var parsedBody;

    if (error) {
      cb(error);
    } else {
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        cb("Could not parse JSON");
      }

      cb(null, message, parsedBody);
    }
  };
}

function buildWrapperFn(
  root,
  parseResult,
  method,
  requestModule,
  requestOptions,
  shouldParseJson
) {
  requestOptions = requestOptions || {};

  if (["patch", "post", "put"].indexOf(method) !== -1) {
    return function () {
      var args = arguments["0"];
      var body = arguments["1"];
      var moreRequestOptions = arguments.length === 4 ? arguments["2"] : {};
      var cb = arguments.length === 4 ? arguments["3"] : arguments["2"];

      var uri = buildUri(root, args, parseResult);
      var next = shouldParseJson ? getParseJsonFn(cb) : cb;

      Object.assign(requestOptions, moreRequestOptions);
      requestOptions.uri = uri;
      requestOptions.method = method.toUpperCase();
      requestOptions.body = body;

      return requestModule(requestOptions, next);
    };
  } else {
    return function () {
      var args = arguments["0"];
      var moreRequestOptions = arguments.length === 3 ? arguments["1"] : {};
      var cb = arguments.length === 3 ? arguments["2"] : arguments["1"];

      var uri = buildUri(root, args, parseResult);
      var next = shouldParseJson ? getParseJsonFn(cb) : cb;

      Object.assign(requestOptions, moreRequestOptions);
      requestOptions.uri = uri;
      requestOptions.method = method.toUpperCase();

      return requestModule(requestOptions, next);
    };
  }
}

module.exports.create = function (config) {
  return null;
};
