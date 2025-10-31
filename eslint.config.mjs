import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";


export default [
{
files: ["**/*.ts"],
languageOptions: {
parser: tsParser,
parserOptions: { project: false }
},
plugins: { "@typescript-eslint": tseslint },
rules: {
...tseslint.configs.recommended.rules,
"@typescript-eslint/no-misused-promises": "off"
}
},
prettier
];