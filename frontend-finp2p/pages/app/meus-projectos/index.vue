<script setup lang="ts">
const { data: Projects } = await useFetch(
  "https://finp2p.onrender.com/api/project/mys",
  {
    headers: {
      Authorization: `Bearer ${authCookie.getToken()}`,
    },
  }
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
      <h3 class="mb-4">Meus Projectos</h3>

      <div class="w-full grid grid-cols-12">
        <div class="col-span-12 mb-3">
          <nuxt-link to="/app/meus-projectos/cadastrar" class="">
            <button
              class="block antialiased text-white font-medium bg-gradient-to-bl to-green-400 from-green-600 py-2 px-3 rounded-md"
            >
              Cadastrar Projecto
            </button>
          </nuxt-link>
        </div>

        <div class="col-span-12">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="px-4 bg-neutral-300/60 uppercase rounded-tl-lg">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    Nome do Peojecto
                  </p>
                </th>
                <th class="p-4 bg-neutral-300/60 uppercase">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    Valor necessário
                  </p>
                </th>
                <th class="p-4 bg-neutral-300/60 uppercase">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    Estado
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
                <tr v-for="(pj, idx) in Projects" :key="idx">
                  <td class="max-w-72 px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ pj.name }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ currencyFormat(pj.amountRequired) }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ pj.isApproved ? "Aprovado" : "Pendente" }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <div class="flex gap-2">
                      <nuxt-link :to="{ path: `/app/meus-projectos/${pj.id}` }">
                        <button
                          class="block antialiased text-white font-medium bg-brand-primary p-2 rounded-md"
                        >
                          Visualizar
                        </button>
                      </nuxt-link>
                      <button
                        class="block antialiased font-medium text-red-500 p-2 rounded-md transition-all hover:bg-red-100"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="4" class="text-center p-2 h-52">
                    Não possuí projectos cadastrados!
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
      </div>
    </section>
  </main>
</template>
