import { resolve, join } from 'path'
import { defineConfig } from 'vite'

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../');

export default defineConfig({
    resolve: {
        alias: {
            '#': resolve(PROJECT_ROOT, 'src'),
        },
    },
    build: {
        lib: {
        entry: resolve(__dirname, 'demo.ts'),
        name: 'demo',
        fileName: 'demo',
        },
    },
})