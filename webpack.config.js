// Look into src/index.js file and any import in there and bundle their code
// into a single file in dist/bundle.js file

const path = require("path");
// configuration of webpack
module.exports = {
  mode: "development",
  // where to look:
  entry: "./src/index.js",
  output: {
    // where to put the result after bundling
    path: path.resolve(__dirname, "dist"),
    // Output file :
    filename: "bundle.js",
  },
  // rebundle at each save
  watch: true,
};
