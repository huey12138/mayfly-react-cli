module.exports = {
  extends: ["stylelint-config-recommended"],
  plugins: ["stylelint-scss", "stylelint-selector-bem-pattern"],
  rules: {
    "plugin/selector-bem-pattern": {
      preset: "bem",
    },
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["function", "if", "each", "include", "mixin", "return"],
      },
    ],
  },
};
