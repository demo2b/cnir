const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const scss = require('rollup-plugin-scss');

module.exports = [
    {
        input: 'src/main/public/statics/scripts/main.js',
        output: {
            file: 'src/main/public/statics/scripts/main.bundle.js',
            format: 'umd'
        },
        plugins: [nodeResolve(),commonjs()]
    },
    {
        input: 'src/main/public/statics/scripts/specifc/views/reservations/reservations.js',
        output: {
            file: 'src/main/public/statics/scripts/specifc/views/reservations/reservations.bundle.js',
            format: 'umd'
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            scss({ fileName: 'reservations.bundle.css' })
        ]
    },
]
