module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "always"],
    // 不允许return, throw, continue, and break后增加代码（不可能执行）
    "no-unreachable": "off",
    "jsx-quotes": [1, "prefer-single"], // jsx单引号
    "new-cap": 0, // 构造函数首字母大写
    "no-mixed-spaces-and-tabs": 1, // 禁止使用 空格 和 tab 混合缩进
    quotes: [1, "single", { avoidEscape: true }],
    "prettier/prettier": ["error", { singleQuote: true, jsxSingleQuote: true }],
    "max-lines": [2, { max: 600, skipBlankLines: true, skipComments: true }],
    complexity: ["error", { max: 20 }], // 程序圈复杂度不能超过10，超过10请拆分
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
  globals: {
    global: false,
  },
};
