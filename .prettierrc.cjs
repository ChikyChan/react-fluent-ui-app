module.exports = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports"
  ],
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
    "^(?!.*[.]css$)[./].*$",
    ".css$"
  ],
  importOrderParserPlugins: [
    "typescript",
    "jsx",
    "decorators-legacy"
  ],
  importOrderTypeScriptVersion: "5.0.0"
}