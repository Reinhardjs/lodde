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
