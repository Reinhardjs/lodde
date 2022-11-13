module.exports.init = function () {
  const apiWrapper = require("./apiWrapper");
  return apiWrapper.create({
    root: "https://api.steinhq.com/v1/storages/6370ad8beced9b09e9a4cbc2",
    get: {
      getAll: "/fishs",
      getAllBy: "/fishs?search",
    },
    requestDefaults: {
      headers: {
        Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=",
      },
    },
  });
};
