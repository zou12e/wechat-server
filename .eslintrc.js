module.exports = {
    root: true,
    extends: 'standard',
    globals: {
        // mocha BDD
        describe: true,
        context: true,
        it: true,
        specify: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true
    },
    rules: {
        // 行尾必须加分号
        'semi': ['error', 'always'],
        // 缩进使用 4 个空格
        'indent': ['error', 4],
        // 要求使用 let 或 const 而不是 var
        'no-var': ['error'],
        // 优先使用 const，其次才是 let
        'prefer-const': ['error'],
        // 是否可以使用call或者apply
        'no-useless-call': ['off'],
        // 箭头函数参数仅有一个时，不需要加括号
        'arrow-parens': ['error', 'as-needed']
    }
};