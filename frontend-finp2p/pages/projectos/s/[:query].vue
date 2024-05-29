<script setup lang="ts">
definePageMeta({
  layout: "website",
});

const { query } = useRoute().params;
</script>

<template>
  <section class="w-screen min-h-[30rem] hero-project">
    <div
      class="w-full min-h-[30rem] flex flex-col items-center justify-center text-white"
    >
      <h2>À pesquisar por</h2>
      <h1 class="mb-3">'{{ query }}'</h1>
    </div>
  </section>
  <section class="my-16">
    <div class="max-w-screen-xl mx-auto grid grid-cols-12 gap-8">
      <template v-if="false">
        <div class="col-span-12">
          <h2>Projectos</h2>
        </div>
        <card-project v-for="idx in 9" :key="idx" />
        <div class="col-span-12">
          <div class="flex items-center justify-center gap-8">
            <button
              disabled
              class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span
                class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              >
                <Icon
                  name="heroicons:arrow-left-solid"
                  size="20"
                  class="font-bold"
                />
              </span>
            </button>
            <p
              class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
            >
              Page <strong class="text-gray-900">1</strong> of
              <strong class="text-gray-900">10</strong>
            </p>
            <button
              class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span
                class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              >
                <Icon name="heroicons:arrow-right-solid" size="20" />
              </span>
            </button>
          </div>
        </div>
      </template>
      <template>
        <div class="col-span-12 text-center">
          <img src="/public/images/not-found.png" class="mx-auto" />
          <h1 class="mb-3">Ooops! 404</h1>
          <p class="text-lg leading-tight max-w-sm mx-auto">
            Não foi encontrado nenhum projecto com este nome!
          </p>
        </div>
      </template>
    </div>
  </section>
</template>
