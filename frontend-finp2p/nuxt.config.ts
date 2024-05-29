import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-AO",
      },
      title: "FinP2P",
      script: [
        {
          src: "https://unpkg.com/@material-tailwind/html@latest/scripts/dialog.js",
        },
      ],
    },
  },
  alias: {
    "@stores": resolve(__dirname, "./stores"),
    "@types": resolve(__dirname, "./types"),
    "@utils": resolve(__dirname, "./utils"),
    "@imgs": resolve(__dirname, "./assets/imgs"),
  },
  css: [
    "@/styles/simplebar.css",
    "@/styles/perfect-scrollbar.css",
    "@/styles/pace.min.css",
    "@/styles/bootstrap.min.css",
    "@/styles/metisMenu.min.css",
    "@/styles/app.css",
  ],
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    // "nuxt-security",
    "radix-vue/nuxt",
    "nuxt-typed-router"
  ],
  googleFonts: {
    preload: true,
    preconnect: true,
    families: {
      Poppins: [300, 400, 500, 700, 900],
    },
  },
});