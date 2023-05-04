const { override, babelInclude } = require("customize-cra");
const path = require("path");

module.exports = override(babelInclude([path.join(__dirname, "src"), path.join(__dirname, "..", "ui/src")]));
