import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {copy} from '@web/rollup-plugin-copy';

export default {
    input: Object.fromEntries(
        glob.sync('src/**/*.ts').map(file => [
            path.relative(
                'src',
                file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
        ])
    ),
    output: {
        dir: 'dist',
    },
    plugins: [
        // Optional: copy any static assets to build directory
        copy({
            patterns: ['images/**/*'],
        }),
    ],
    preserveEntrySignatures: 'strict',
};
