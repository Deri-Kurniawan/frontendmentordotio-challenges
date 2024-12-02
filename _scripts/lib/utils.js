const path = require("path");

/**
 * The base path of the project on your local machine
 * for local app access and screenshot taking
 */
const rootFullPath = (url) => {
  const localProjectBasePath = path.join(__dirname, "../../");
  return path.join(`${localProjectBasePath}/`, url);
};

module.exports = {
  rootFullPath,
};
