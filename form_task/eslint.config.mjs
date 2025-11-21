import stylistic from '@stylistic/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

export default {
    plugins: {
        '@stylistic': stylistic,
        '@typescript-eslint': typescriptEslint,
        'playwright': playwright,
    },
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            project: true,
        },
    },
    files: ['**/*.ts'],
    ignores: ['eslint.config.mjs', 'playwright-report/**', 'testplane-report/**'],
    rules: {
        // * Style Rules
        '@stylistic/indent': 'off',
        '@stylistic/semi': 'error',
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/brace-style': ['error', '1tbs'],
        '@stylistic/block-spacing': 'error',
        '@stylistic/quote-props': ['error', 'consistent'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/padded-blocks': 'off',
        '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
        '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
        '@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        '@stylistic/max-len': [
            'error',
            {
                code: 120,
                tabWidth: 4,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignorePattern: '^import |^export',
            },
        ],
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        '@stylistic/lines-between-class-members': [
            'error',
            {
                enforce: [
                    { blankLine: 'always', prev: '*', next: 'method' },
                    { blankLine: 'always', prev: 'method', next: '*' },
                    { blankLine: 'never', prev: 'field', next: 'field' },
                    { blankLine: 'always', prev: 'field', next: 'method' },
                    { blankLine: 'always', prev: 'method', next: 'field' },
                ],
            },
        ],

        // * TypeScript Rules
        'eol-last': ['error', 'always'],
        'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }],
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'none',
                caughtErrors: 'none',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/class-literal-property-style': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'constructor',
                    'signature',
                    'public-get',
                    'protected-get',
                    'private-get',
                    'public-set',
                    'protected-set',
                    'private-set',
                    'public-method',
                    'protected-method',
                    'private-method',
                    'public-field',
                    'protected-field',
                    'private-field',
                ],
            },
        ],
        // * Playwright Rules
        'playwright/expect-expect': [
            'error',
            {
                assertFunctionNames: ['checkEventFieldsAreCorrect'],
            },
        ],
        'playwright/missing-playwright-await': 'error',
        'playwright/no-focused-test': 'error',
        'playwright/no-page-pause': 'error',
    },
};
