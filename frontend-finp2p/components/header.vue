<script setup lang="ts"></script>

<template>
  <header class="h-16 w-full p-2 sticky top-0 bg-white border-b shadow-sm">
    <nav class="max-w-screen-xl mx-auto flex justify-between items-center">
      <nuxt-link to="/" class="">
        <h1 class="!text-brand-primary">FinP2P</h1>
      </nuxt-link>

      <ul class="text-lg flex items-center gap-4">
        <li>
          <nuxt-link
            to="/projectos"
            class="hover:text-brand-primary hover:font-medium"
          >
            Projectos
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            @click="useAppModalStore().onModalFaq(true)"
            class="hover:text-brand-primary hover:font-medium cursor-pointer"
          >
            FAQ
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            @click="useAppModalStore().onModalContact(true)"
            class="hover:text-brand-primary hover:font-medium cursor-pointer"
          >
            Contacto
          </nuxt-link>
        </li>
        <nuxt-link
          to="/app/auth/login"
          class="leading-none px-4 py-2.5 border !border-brand-primary rounded-full transition-all hover:bg-brand-primary hover:text-white"
        >
          Entrar
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>
