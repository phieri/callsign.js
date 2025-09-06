import js from "@eslint/js";

export default [
  {
    ...js.configs.recommended,
    "rules": {
      "indent": ["error", 2],
      "complexity": ["error"],
      "no-floating-decimal": ["error"],
      "no-invalid-regexp": ["error"]
    }
  }
];
