import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
      dts()
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'C4Components',// A name for the UMD build (for use in browsers via <script> tag)
            fileName: (format) => `c4-components.${format}.js`,
        },
        rollupOptions: {
            // We'll add something here later if we had external dependencies like React
        }
    }
})