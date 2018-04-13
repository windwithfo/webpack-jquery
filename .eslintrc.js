module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // 箭头空格
    'arrow-spacing': 1,
    // 箭头函数用小括号括起来
    'arrow-parens': 1,
    // 生成器函数*的前后空格
    'generator-star-spacing': 0,
    // 禁止修改const声明的变量
    'no-const-assign': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 缩进风格
    'indent': [1, 2, {
      'SwitchCase': 1
    }],
    // 语句强制分号结尾
    'semi': [1, 'always'],
    // 分号前后空格
    'semi-spacing': [1, {
      'before': false,
      'after': false
    }],
    // 强制驼峰法命名
    'camelcase': 1,
    // 逗号风格，换行时在行首还是行尾
    'comma-style': [1, 'last'],
    // 对象字面量项尾不能有逗号
    'comma-dangle': [1, 'never'],
    // 必须使用全等
    'eqeqeq': 1,
    // 必须使用 if(){} 中的{}
    'curly': [1, 'all'],
    // 大括号风格
    'brace-style': [1, 'stroustrup'],
    // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 1,
    // 函数参数不能重复
    'no-dupe-args': 1,
    // switch中的case标签不能重复
    'no-duplicate-case': 1,
    // 如果if语句里面有return,后面不能跟else语句
    'no-else-return': 1,
    // 禁止行内备注
    'no-inline-comments': 1,
    // 函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 1,
    // 禁止重复声明变量
    'no-redeclare': 1,
    // 禁止给参数重新赋值
    'no-param-reassign': 1,
    // 禁止多余的冒号
    'no-extra-semi': 1,
    // 不能用多余的空格
    'no-multi-spaces': [1, {
      'exceptions': {
        'ImportDeclaration': true
      }
    }],
    // 禁止使用eval
    'no-eval': 1,
    // 禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [1, false],
    // 空行最多不能超过2行
    'no-multiple-empty-lines': [1, {
      'max': 2
    }],
    // 不能有声明后未被使用的变量或参数
    'no-unused-vars': [1, {
      'vars': 'all',
      'args': 'after-used'
    }],
    // 一行结束后面不要有空格
    'no-trailing-spaces': 1,
    // 不能有未定义的变量
    'no-undef': 1,
    // 变量初始化时不能直接给它赋值为undefined
    'no-undef-init': 1,
    // jsdoc规则
    'valid-jsdoc': 1,
    // 禁止比较时使用NaN，只能用isNaN()
    'use-isnan': 1,
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [1, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    // 不以新行开始的块{前面要不要有空格
    'space-before-blocks': [1, {
      'functions': 'always',
      'keywords': 'always',
      'classes': 'always'
    }],
    // 关键字要不要有空格
    'keyword-spacing': [1, {
      'after': true
    }],
    // 变量声明后是否需要空一行
    'newline-after-var': 0,
    // 连续声明
    'one-var': 1,
    // 回调嵌套深度
    'max-nested-callbacks': [0, 4],
    // 字符串最大长度
    'max-len': [1, 120],
    // 对象字面量中冒号的前后空格
    'key-spacing': [1, {
      'beforeColon': false,
      'afterColon': true
    }],
    // 行前/行后备注
    'lines-around-comment': [1, {
      'beforeBlockComment': true,
      'allowBlockStart': true
    }],
    // 注释位置
    'line-comment-position': [1, {
      'position': 'above'
    }],
    // 注释风格要不要有空格什么的
    'spaced-comment': 1,
    // 禁止不必要的计算性能键对象的文字
    'no-useless-computed-key': 1,
    'no-var': 1,
    'no-const-assign': 1,
    'object-property-newline': 1,
    'object-curly-newline': [0, {
      minProperties: 1
    }],
    'object-curly-spacing': [1, 'always'],
    'no-new-object': 1,
    // !!的使用
    "no-extra-boolean-cast": 0,
    // 字符串拼接风格
    "operator-linebreak": [2, 'before']
  }
}
