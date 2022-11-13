function getById(baseApiWrapper) {
  return function (id) {
    return new Promise((resolve, reject) => {
      baseApiWrapper
        .getAllBy("uuid", id)
        .then((responseData) => {
          resolve(responseData[0]);
        })
        .catch((error) => reject(error));
    });
  };
}

function getAllByRange(baseApiWrapper) {
  return function (by, from, to) {
    return new Promise((resolve, reject) => {
      baseApiWrapper
        .getAll()
        .then((response) => {
          var filteredFishs = response.filter((item) => {
            const intValue = parseInt(item[by]);
            return intValue >= from && intValue <= to;
          });
          resolve(filteredFishs);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

module.exports.init = function () {
  const apiWrapper = require("./apiWrapper");
  const createdApiWrapper = apiWrapper.create({
    root: "https://api.steinhq.com/v1/storages/6370ad8beced9b09e9a4cbc2",
    get: {
      getAll: "/fishs",
      getAllBy: "/fishs?search",
      getSizes: "/sizes",
      getAreas: "/areas",
    },
    post: {
      addRecord: "/fishs",
    },
    requestDefaults: {
      headers: {
        Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQxMjM=",
      },
    },
  });

  createdApiWrapper.getById = getById(createdApiWrapper);
  createdApiWrapper.getAllByRange = getAllByRange(createdApiWrapper);

  return createdApiWrapper;
};
