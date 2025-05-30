import { defineConfig } from "vite"
import IstanbulPlugin from "vite-plugin-istanbul"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [IstanbulPlugin(), react(), tailwindcss()],
})
