<script setup lang="ts">
const { data: Projects } = await useFetch(
  "http://localhost:4000/api/project/approveds"
);

definePageMeta({
  layout: "website",
});
</script>

<template>
  <section class="w-screen min-h-[30rem] hero-project">
    <div
      class="w-full min-h-[30rem] flex flex-col items-center justify-center text-white"
    >
      <h1 class="mb-3">Projectos</h1>
      <p class="text-neutral-200 text-lg mb-4">
        Projectos que precisam de investimentos!
      </p>

      <div class="max-w-screen-sm w-full bg-white p-2 rounded-full">
        <form action="" class="flex">
          <input
            name="project"
            type="text"
            placeholder="Procure por projecto"
            class="bg-transparent pl-5 flex-1 text-neutral-900 placeholder:!text-neutral-900 focus:outline-none"
          />
          <button class="bg-brand-primary px-3 py-2 rounded-full">
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  </section>
  <section class="my-16">
    <div class="max-w-screen-xl mx-auto grid grid-cols-12 gap-8">
      <div class="col-span-12">
        <h2>Projectos</h2>
      </div>
      <template v-if="Projects.length > 0">
        <card-project
          v-for="(project, idx) in Projects"
          :key="idx"
          :name="project.name"
          :cover="project.image"
          :id="project.id"
        />
      </template>
      <template v-else>
        <div class="col-span-12 text-center">
          <span
            >Não projectos disponíveis para obter investimentos no
            momento!</span
          >
        </div>
      </template>
      <div class="col-span-12">
        <div class="flex items-center justify-center gap-8">
          <button
            disabled
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            :class="{
              '!opacity-40 !cursor-not-allowed': Projects.length === 0,
            }"
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
            :class="{
              '!opacity-40 !cursor-not-allowed': Projects.length === 0,
            }"
            class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
          >
            Page <strong class="text-gray-900">1</strong> of
            <strong class="text-gray-900">10</strong>
          </p>
          <button
            type="button"
            :disabled="Projects.length === 0"
            :class="{
              '!opacity-40 !cursor-not-allowed': Projects.length === 0,
            }"
            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <span
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <Icon name="heroicons:arrow-right-solid" size="20" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
