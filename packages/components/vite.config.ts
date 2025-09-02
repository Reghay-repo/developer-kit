import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
      dts()
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'C4Components',
            fileName: (format) => `c4-components.${format}.js`,
        },
        rollupOptions: {
        }
    }
})