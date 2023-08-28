const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [{
    input: 'src/main/public/statics/scripts/main.js',
    output: {
        file: 'src/main/public/statics/scripts/main.bundle.js',
        name: 'CoreJS',
        format: 'umd'
    },
    plugins: [nodeResolve(),commonjs()]
}]
