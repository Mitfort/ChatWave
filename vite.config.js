import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
optimizeDeps: {
esbuildOptions: {
// Node.js global to browser globalThis
define: {
global: 'globalThis',
},
},
},
build: {
rollupOptions: {
output: {
manualChunks(id) {
if (id.includes('node_modules')) {
return id
.toString()
.split('node_modules/')[1]
.split('/')[0]
.toString();
}
},
},
},
},
});