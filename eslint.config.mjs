import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default [
	{
		ignores: [".next/**", "node_modules/**"],
	},
	{
		files: ["**/*.{js,jsx,mjs}"],
		languageOptions: {
			ecmaVersion: 2023,
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	js.configs.recommended,
	{
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
			"@next/next": nextPlugin,
		},
		files: ["**/*.{js,jsx,mjs}"],
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
				"react/jsx-uses-vars": "error",
			"react/prop-types": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"@next/next/no-img-element": "off",
		},
	},
];

