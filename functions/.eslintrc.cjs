module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "script", // ✅ Allow require, exports, etc.
  },
  extends: ["eslint:recommended"],
  rules: {},
};
