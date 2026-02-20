const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

module.exports = [
    {
        ignores: ['projects/**/*'],
    },
    ...compat.config({
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
        plugins: ['@typescript-eslint', 'simple-import-sort'],
        overrides: [
            {
                files: ['*.ts'],
                parser: '@typescript-eslint/parser',
                parserOptions: {
                    project: './tsconfig.json',
                    tsconfigRootDir: __dirname,
                },
                env: {
                    browser: true,
                    node: true,
                },
                extends: [
                    'eslint:recommended',
                    'plugin:@typescript-eslint/recommended',
                    'plugin:@angular-eslint/recommended',
                    'plugin:@angular-eslint/template/process-inline-templates',
                    'plugin:import/recommended',
                ],
                rules: {
                    '@angular-eslint/directive-selector': [
                        'error',
                        {
                            type: 'attribute',
                            prefix: 'app',
                            style: 'camelCase',
                        },
                    ],
                    '@angular-eslint/component-selector': [
                        'error',
                        {
                            type: 'element',
                            prefix: 'app',
                            style: 'kebab-case',
                        },
                    ],
                    '@typescript-eslint/no-unused-vars': [
                        'warn',
                        {
                            argsIgnorePattern: '^_',
                            varsIgnorePattern: '^_',
                        },
                    ],
                    quotes: [2, 'single', { avoidEscape: true }],
                    'comma-dangle': [
                        'error',
                        {
                            arrays: 'always-multiline',
                            objects: 'always-multiline',
                            imports: 'always-multiline',
                            exports: 'always-multiline',
                            functions: 'always-multiline',
                        },
                    ],
                    semi: ['error', 'always'],
                    indent: ['error', 4, { SwitchCase: 1 }],
                    'eol-last': ['error', 'always'],
                    'object-curly-spacing': ['error', 'always'],
                    'array-bracket-spacing': ['error', 'always'],
                    'no-trailing-spaces': 'error',
                    'comma-spacing': [
                        'error',
                        {
                            before: false,
                            after: true,
                        },
                    ],
                    'simple-import-sort/imports': [
                        'error',
                        {
                            groups: [
                                [
                                    '^@angular',
                                    '^([a-z/-]+|@(?!components|decorators|directives|environment|guards|pipes|interceptors|lib|services|src)).+',
                                ],
                                ['^@\\w'],
                                [
                                    '^\\.\\.',
                                    '^\\.\\./?$',
                                    '^\\.\\./(?=.*/)(?!/?$)',
                                    '^\\.(?!/?$)',
                                    '^\\./?$',
                                ],
                            ],
                        },
                    ],
                },
            },
            {
                files: ['*.html'],
                extends: [
                    'plugin:@angular-eslint/template/recommended',
                    'plugin:@angular-eslint/template/accessibility',
                ],
                rules: {
                    '@angular-eslint/template/no-autofocus': 'off',
                },
            },
        ],
    }),
];
