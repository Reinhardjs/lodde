"use strict";
var XMLHttpRequest = require("xhr2");

var pathVarsRe = /\${([^\}]+)}/g;

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

function buildUri(root, parameters, parseResult) {
  var uri = uriJoin(root, parseResult.withoutParams);
  var params = [];

  Object.keys(parameters).forEach(function (key) {
    var value = parameters[key];
    var pathVarIndex = parseResult.pathVars.indexOf(key);
    var paramsIndex;

    if (pathVarIndex !== -1) {
      uri = uri.replace("${" + key + "}", value);
    } else if ((paramsIndex = parseResult.params.indexOf(key)) !== -1) {
      params.push(key + "=" + value);
    }
  });

  if (params.length) {
    uri = uri + "?" + params.join("&");
  }

  return uri;
}

function sendHttpRequest(requestOptions) {
  const url = requestOptions.uri;
  const method = requestOptions.method;
  const data = requestOptions.body;
  const headers = requestOptions.headers;
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

function buildWrapperFn(
  root,
  parseResult,
  method,
  requestDefaults,
  requestOptions
) {
  requestOptions = requestOptions || {};

  var mergedHeaders = {};
  if (requestOptions.headers) {
    Object.assign(mergedHeaders, requestOptions.headers);
  }

  if (requestDefaults.headers) {
    Object.assign(mergedHeaders, requestDefaults.headers);
  }

  Object.assign(requestOptions, requestDefaults);
  requestOptions.headers = mergedHeaders;

  if (["patch", "post", "put"].indexOf(method) !== -1) {
    return function (arg) {
      var parameters = arg.parameters ? arg.parameters : {};
      var body = arg.body ? arg.body : {};
      var moreRequestOptions = arg.requestOptions ? arg.requestOptions : {};

      var uri = buildUri(root, parameters, parseResult);

      Object.assign(requestOptions, moreRequestOptions);
      requestOptions.uri = uri;
      requestOptions.method = method.toUpperCase();
      requestOptions.body = body;

      return sendHttpRequest(requestOptions);
    };
  } else {
    return function (arg) {
      var parameters, moreRequestOptions;

      if (arg === undefined) {
        parameters = {};
        moreRequestOptions = {};
      } else {
        parameters = arg.parameters ? arg.parameters : {};
        moreRequestOptions = arg.requestOptions ? arg.requestOptions : {};
      }
      var uri = buildUri(root, parameters, parseResult);

      Object.assign(requestOptions, moreRequestOptions);
      requestOptions.uri = uri;
      requestOptions.method = method.toUpperCase();

      return sendHttpRequest(requestOptions);
    };
  }
}

function getMethodIterator(config, cb) {
  var httpMethods = ["delete", "get", "head", "patch", "post", "put"];

  httpMethods.forEach(function (method) {
    var methodMap = config[method];

    if (methodMap) {
      Object.keys(methodMap).forEach(function (key) {
        var value = methodMap[key];

        cb(method, key, value);
      });
    }
  });
}

module.exports.create = function (config) {
  var root = config.root;
  var requestDefaults = config.requestDefaults;
  var wrapper = {};

  getMethodIterator(config, function (method, key, value) {
    var pathPattern;
    var requestOptions;
    var parseResult;

    if (typeof value === "string") {
      pathPattern = value;
      requestOptions = null;
    } else {
      pathPattern = value.pathPattern;
      requestOptions = value.requestOptions;
    }

    parseResult = parse(pathPattern);
    wrapper[key] = buildWrapperFn(
      root,
      parseResult,
      method,
      requestDefaults,
      requestOptions
    );
  });

  return wrapper;
};
