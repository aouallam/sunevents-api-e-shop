const { fromDir } = require("../../@functions/routes.func.js");

const routesPath = {
  private: { path: `${__dirname}/private`, access: "private" },
  public: { path: `${__dirname}/public`, access: "public" },
};

const routes = Object.entries(routesPath).map(([key, value]) => {
  const paths = fromDir(value.path, "js");
  const result = paths.map((path) => {
    if (path !== __filename) {
      return require(path);
    }
  });
  return {
    type: key,
    access: value.access,
    routes: result,
  };
  //console.log(result);
});

module.exports = routes;
