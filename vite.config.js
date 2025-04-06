import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/shoppingreact",
  //base: "https://blakcoder2017.github.io/e-plantShopping/",
  plugins: [react()],
  base: "/e-plantShopping/",
})
