import { resolve } from 'path'
import { defineConfig } from 'vite'

const PACKAGE_ROOT = __dirname;

export default defineConfig({
    build: {
        lib: {
            entry: resolve(PACKAGE_ROOT, 'src', 'index.ts'),
            name: 'index',
            fileName: 'index',
        },
        outDir: 'dist'
    },
})