<script setup lang="ts">
const { data: Projects } = await useFetch(
  "http://localhost:4000/api/project/approveds"
);

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <section class="mt-4 mb-8">
      <h3 class="mb-4">Projectos</h3>

      <div class="flex justify-between h-10 mb-4">
        <form
          class="relative max-w-md w-full h-10 bg-white flex !border border-brand-primary/20 rounded overflow-hidden shadow-sm"
        >
          <input
            type="text"
            class="flex-1 pl-2 placeholder:!text-neutral-900 focus:outline-brand-primary"
            placeholder="Pesquisar projecto"
          />
          <button
            class="absolute right-0 w-32 h-full bg-brand-primary px-4 text-center text-white hover:bg-brand-primary-darker focus:outline-none"
          >
            Pesquisar
          </button>
        </form>

        <div class="flex gap-3">
          <nuxt-link
            to="/app/projectos/pendentes"
            class="flex px-4 items-center bg-brand-primary/90 text-white rounded-md"
          >
            Ver Pedidos de Financiamento
          </nuxt-link>
          <button
            class="h-10 p-2 !border rounded-md hover:bg-brand-primary/10 shadow-sm"
          >
            <Icon name="heroicons:ellipsis-vertical-20-solid" />
          </button>
        </div>
      </div>

      <div>
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="px-4 bg-neutral-300/60 uppercase rounded-tl-lg">
                <p
                  class="antialiased leading-none text-neutral-600 font-medium"
                >
                  Utilizador
                </p>
              </th>
              <th class="p-4 bg-neutral-300/60 uppercase">
                <p
                  class="antialiased leading-none text-neutral-600 font-medium"
                >
                  Nome do projecto
                </p>
              </th>
              <th class="p-4 bg-neutral-300/60 uppercase">
                <p
                  class="antialiased leading-none text-neutral-600 font-medium"
                >
                  Valor necessário
                </p>
              </th>
              <th class="p-4 bg-neutral-300/60 uppercase rounded-tr-lg">
                <p
                  class="antialiased leading-none text-neutral-600 font-medium"
                >
                  Ação
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="Projects.length > 0">
              <tr v-for="(project, idx) in Projects" :key="idx">
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ project.entity.name }}
                  </p>
                </td>
                <td class="max-w-56 px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ project.name }}
                  </p>
                </td>
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ currencyFormat(project.amountRequired) }}
                  </p>
                </td>
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <nuxt-link :to="{ path: `/app/projectos/${project.id}` }">
                    <button
                      class="block antialiased text-white font-medium bg-brand-primary p-2 rounded-md"
                    >
                      Visualizar
                    </button>
                  </nuxt-link>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4" class="h-64 text-center">
                  <p>Sem projectos aprovados!</p>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td class="px-4 p-2.5 bg-neutral-100" colspan="4">
                <div class="flex items-center justify-center gap-8">
                  <button
                    disabled
                    class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span
                      class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        ></path>
                      </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </main>
</template>
