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

module.exports.create = function (config) {
  return null;
};
