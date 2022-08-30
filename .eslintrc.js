const { rules } = require("eslint-config-prettier");

module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    parser: "vue-eslint-parser",
    rules: {
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 999
        },      
        "multiline": {
          "max": 999
        }
      }]
    }
  }