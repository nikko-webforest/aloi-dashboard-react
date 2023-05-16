const { override, babelInclude } = require("customize-cra");
const path = require("path");

// change the encryption algorithm of webpack from md4 to sha256 because md4 is considered unsafe by node v17+
const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = override(babelInclude([path.join(__dirname, "src"), path.join(__dirname, "..", "ui/src")]));
