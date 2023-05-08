import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    build: {
        lib: {
            entry: './lib/bem.ts',
            name: 'BEM',
            fileName: 'bem',
        },
        emptyOutDir: false,
    },
    plugins: [
        dts({
            outputDir: './dist',
            include: ['./lib'],
        }),
        copy({
            verbose: true,
            targets: [
                {
                    src: './lib/bem.scss',
                    dest: './dist',
                }
            ]
        }),
    ]
});
