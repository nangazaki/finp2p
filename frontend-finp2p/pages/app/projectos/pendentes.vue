<script setup lang="ts">
const { data: Projects } = await useFetch(
  "https://finp2p.onrender.com/api/project/rejecteds"
);

console.log(Projects.value);

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <ui-modal-acept-project />
    <ui-modal-reject-project />

    <section class="mt-4 mb-8">
      <h3 class="mb-4">Projectos Pendentes</h3>

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
                ></p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, idx) in Projects" :key="idx">
              <td class="px-4 p-2.5 border-b border-neutral-200">
                <p class="antialiased font-normal text-neutral-600">
                  {{ project.entity.name }}
                </p>
              </td>
              <td class="px-4 p-2.5 border-b border-neutral-200">
                <p class="antialiased font-normal text-neutral-600">
                  {{ project.name }}
                </p>
              </td>
              <td class="px-4 p-2.5 border-b border-neutral-200">
                <p class="antialiased font-normal text-neutral-600">
                  AOA {{ project.amountRequired }}
                </p>
              </td>
              <td class="px-4 p-2.5 border-b border-neutral-200 flex gap-2">
                <button
                  @click="
                    useAppModalStore().onModalAceptProject({
                      state: true,
                      info: {
                        id: project.id,
                        name: project.name,
                      },
                    })
                  "
                  class="block antialiased text-white font-medium bg-gradient-to-tr from-green-600 to-green-400 p-2 hover:bg-brand-primary-darker rounded-md"
                >
                  Aprovar
                </button>
                <button
                  @click="
                    useAppModalStore().onModalRejectProject({
                      state: true,
                      info: {
                        id: project.id,
                        name: project.name,
                      },
                    })
                  "
                  class="block antialiased font-medium text-red-500 p-2 hover:bg-red-500/10 active:bg-red-500/30 rounded-md"
                >
                  Rejeitar
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="px-4 p-2.5 bg-neutral-100" colspan="4">
                <div class="flex items-center justify-between gap-8">
                  <div>
                    <p>Página <strong>1</strong> de <strong>10</strong></p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="select-none rounded-lg !border !border-gray-900 py-2 px-3 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Anterior
                    </button>
                    <button
                      class="select-none rounded-lg !border !border-gray-900 py-2 px-3 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </main>
</template>
