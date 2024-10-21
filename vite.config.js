import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';
import ViteMinifyPlugin from 'vite-plugin-minify';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
            ViteMinifyPlugin({}),
            obfuscatorPlugin({
                include: ["src/components/**/*.tsx"],
                exclude: [/node_modules/],
                apply: "build",
                debugger: false,
                options: {
                    stringArray: true,
                    stringArrayCallsTransform: true,
                    stringArrayEncoding: ["base64"],
                    stringArrayRotate: true,
                    stringArrayShuffle: true,
                    domainLock: [".habbon.cc"],
                    domainLockRedirectUrl: "https://discord.gg/bqc3pfMqUb",
                },                
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '~': resolve(__dirname, 'node_modules')
            }
        },
        build: {
            assetsInlineLimit: 102400,
            rollupOptions: {
                output: {
                    assetFileNames: '[name].[ext]',
                    manualChunks: id =>
                    {
                        if(id.includes('node_modules'))
                        {
                            if(id.includes('@nitrots/nitro-renderer')) return 'nitro-renderer';
    
                            return 'vendor';
                        }
                    }
                }
            }
        }
    }
})