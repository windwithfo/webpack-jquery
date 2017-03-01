{
    rules: {
        color-hex-case: 'lower',
        color-hex-length: 'short',
        font-family-name-quotes: 'always-unless-keyword',
        string-no-newline: true,
        string-quotes: 'single',
        length-zero-no-unit: true,
        declaration-block-semicolon-newline-after: 'always',
        unit-case: 'lower',
        value-keyword-case: 'lower',
        block-no-empty: true,
        max-empty-lines: 1,
        indentation: 4,
        no-missing-end-of-source-newline: true,
        at-rule-semicolon-newline-after: 'always',
        selector-list-comma-newline-after: 'always',
        rule-empty-line-before: ['always',
            except: [
                'first-nested',
                'after-single-line-comment'

            ],
            ignore: ['after-comment']
        ],
        block-opening-brace-newline-after: 'always',
        block-closing-brace-newline-before: 'always',
        block-opening-brace-space-before: 'always',
        declaration-colon-space-before: 'never',
        declaration-colon-space-after: 'always'
    }
}
