"use strict"

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  // custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ["error"],
    camelcase: "off", // 强制使用骆驼拼写法命名约定
    "no-undef": "error" // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
  }
}
