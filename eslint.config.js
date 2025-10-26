import js from "@eslint/js";

export default [
  {
    ...js.configs.recommended,
    "rules": {
      // Code style
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      
      // Code quality
      "complexity": ["error", { "max": 15 }],
      "max-depth": ["error", 4],
      "max-lines-per-function": ["warn", { "max": 100, "skipBlankLines": true, "skipComments": true }],
      
      // Best practices
      "eqeqeq": ["error", "always"],
      "no-floating-decimal": ["error"],
      "no-invalid-regexp": ["error"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      
      // Modern JS
      "prefer-arrow-callback": ["warn"],
      "prefer-template": ["warn"],
      "object-shorthand": ["warn", "always"],
      
      // Potential issues
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": ["error"]
    }
  }
];
