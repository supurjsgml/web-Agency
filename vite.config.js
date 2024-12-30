/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from 'dotenv';
import path from 'path';

export default defineConfig(({mode}) => {
  dotenv.config({ path: path.resolve(__dirname, `.env.${mode}`) });

  return {
    plugins: [vue()],
    define: {
      // "process.env": process.env, // 모든 환경 변수 사용
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0", // 외부에서 접근 가능하도록 설정
      port: Number(process.env.VITE_PORT || 3000), // Docker에서 설정한 포트를 사용
      strictPort: true, // 3000 포트를 강제 사용
    },
  } 
});
