function getPathVars(path) {
    var pathVars = [];
    var match;

    while ((match = pathVarsRe.exec(path)) !== null) {
        pathVars.push(match[1]);
    }

    return pathVars;
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

module.exports.create = function (config) {
  return null;
};
