module.exports = {
  extends: [
    "eslint-config-airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "off", // leave it to tsc
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "arrow-parens": ["error", "always"],
    "class-methods-use-this": "off",
    "import/extensions": ["error", "never"],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.{js,jsx,ts,tsx}"] },
    ],
    "import/prefer-default-export": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-shadow": "off", // leave it to @typescript-eslint
    "no-use-before-define": "off", // leave it to @typescript-eslint
    "no-useless-constructor": "off", // leave it to @typescript-eslint
  },
  overrides: [
    {
      files: "*.{js,jsx}",
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
