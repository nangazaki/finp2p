<script setup lang="ts">
interface IRes {
  data: [];
  meta: {
    total: number;
    lastPage: number;
    currentPage: string;
    peerPage: number;
    prev: number | null;
    next: number | null;
  };
}

const res = ref<IRes>({
  data: [],
  meta: {},
});
const { data } = await useFetch<IRes>("http://localhost:4000/api/feedback");
res.value = data.value;

async function next() {
  const nextPage = Number(res.value.meta.currentPage) + 1;

  const { data } = await useFetch<IRes>(
    `http://localhost:4000/api/feedback?page=${nextPage}`
  );

  res.value = data.value;
}

async function previous() {
  const prevPage = Number(res.value.meta.currentPage) - 1;

  const { data } = await useFetch<IRes>(
    `http://localhost:4000/api/feedback?page=${prevPage}`
  );

  res.value = data.value;
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <section class="mt-4">
      <h3 class="mb-3">Feedback</h3>

      <div
        class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border"
      >
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 bg-brand-primary uppercase rounded-tl-xl">
                <p class="antialiased font-normal leading-none text-white">
                  Nome
                </p>
              </th>
              <th class="p-4 bg-brand-primary uppercase">
                <p class="antialiased font-normal leading-none text-white">
                  Email
                </p>
              </th>
              <th class="p-4 bg-brand-primary uppercase">
                <p class="antialiased font-normal leading-none text-white">
                  Enviada há
                </p>
              </th>
              <th class="p-4 bg-brand-primary uppercase rounded-tr-xl">
                <p class="antialiased font-normal leading-none text-white">
                  Ação
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="res.data.length > 0">
              <tr v-for="(feedback, idx) in res.data" :key="idx">
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ feedback.name }}
                  </p>
                </td>
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ feedback.email }}
                  </p>
                </td>
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <p class="antialiased font-normal text-neutral-600">
                    {{ distanceToNow(feedback.createdAt) }}
                  </p>
                </td>
                <td class="px-4 p-2.5 border-b border-neutral-200">
                  <button
                    @click="
                      useAppModalStore().onModalFeedback({
                        info: feedback,
                        state: true,
                      })
                    "
                    class="block antialiased text-white font-medium bg-brand-primary p-2 rounded-md"
                  >
                    Visualizar
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="h-72">
                <td colspan="4" class="text-center">
                  <p class="text-base">Sem nenhum Feedback no momento!</p>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td class="px-4 p-2.5 bg-neutral-100" colspan="4">
                <div class="flex items-center justify-between gap-8">
                  <div>
                    <p>
                      Página <strong>{{ res.meta.currentPage }}</strong>
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      @click="previous"
                      :disabled="Number(res.meta.currentPage) <= 1"
                      class="select-none rounded-lg !border !border-gray-900 py-2 px-3 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      Anterior
                    </button>
                    <button
                      @click="next"
                      :disabled="!res.meta.next"
                      class="select-none rounded-lg !border !border-gray-900 py-2 px-3 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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

    <ui-modal-feedback />
  </main>
</template>
