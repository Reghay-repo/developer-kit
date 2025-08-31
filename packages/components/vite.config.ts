import { defineConfig } from 'vite';


export default defineConfig({
    build:{
        lib:{
             entry: 'src/index.ts',
             name: 'DeveloperAcceleratorKit',
              fileName: (format) => `dev-accelerator-kit.${format}.js`,
        }
    }
})