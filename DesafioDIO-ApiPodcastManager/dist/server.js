"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var http = __toESM(require("http"));

// src/repositories/podcasts-repository.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var pathData = import_path.default.join(__dirname, "../repositories/podcasts.json");
var repositoryPodcast = (podcastName) => __async(void 0, null, function* () {
  const language = "utf-8";
  const rawData = import_fs.default.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);
  if (podcastName) {
    jsonFile = jsonFile.filter((podcast) => podcast.podcastName === podcastName);
  }
  return jsonFile;
});

// src/services/list-episodes-service.ts
var serviceListEpisodes = () => __async(void 0, null, function* () {
  let responseFormat = {
    statusCode: 0,
    body: []
  };
  const data = yield repositoryPodcast();
  responseFormat = {
    statusCode: data.length !== 0 ? 200 /* OK */ : 204 /* NoContent */,
    body: data
  };
  return responseFormat;
});

// src/services/filter-episodes-services.ts
var serviceFilterEpisodes = (podcastName) => __async(void 0, null, function* () {
  let responseFormat = {
    statusCode: 0,
    body: []
  };
  const queryString = (podcastName == null ? void 0 : podcastName.split("?p=")[1]) || "";
  const data = yield repositoryPodcast(queryString);
  responseFormat = {
    statusCode: data.length !== 0 ? 200 /* OK */ : 204 /* NoContent */,
    body: data
  };
  return responseFormat;
});

// src/controllers/podcasts-controller.ts
var defaultContent = { "Content-Type": "application/json" /* JSON */ };
var getListEpisodes = (request, response) => __async(void 0, null, function* () {
  const content = yield serviceListEpisodes();
  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));
  response.end();
});
var getFilterEpisodes = (request, response) => __async(void 0, null, function* () {
  const content = yield serviceFilterEpisodes(request.url);
  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));
  response.end();
});

// src/app.ts
var app = (request, response) => __async(void 0, null, function* () {
  var _a;
  const baseUrl = (_a = request.url) == null ? void 0 : _a.split("?")[0];
  if (request.method === "GET" /* GET */ && baseUrl === "/api/list" /* LIST */) {
    yield getListEpisodes(request, response);
  }
  if (request.method === "GET" /* GET */ && baseUrl === "/api/podcasts" /* ESPISODE */) {
    yield getFilterEpisodes(request, response);
  }
});

// src/server.ts
var server = http.createServer(app);
var port = process.env.PORT;
server.listen(port, () => {
  console.log(`servidor iniciado na porta ${port}`);
});
