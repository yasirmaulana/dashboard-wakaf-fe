import crypto from 'node:crypto'

// Polyfill crypto.hash for compatibility with Vite 6/7 on older Node.js versions
if (!crypto.hash) {
  // @ts-ignore
  crypto.hash = (algorithm, data, outputEncoding) => {
    const hash = crypto.createHash(algorithm).update(data)
    return outputEncoding ? hash.digest(outputEncoding) : hash.digest()
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'nuxt-icon-tw'
  ],
  shadcn: {
    /**
     * Prefix for all the imported components
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  }
})
