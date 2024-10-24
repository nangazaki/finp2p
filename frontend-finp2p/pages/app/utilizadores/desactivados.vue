<script setup lang="ts">
import { toast } from "vue3-toastify";

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

const { data } = await useFetch<IRes>(
  "http://localhost:4000/api/users/disables?page=1"
);
res.value = data.value;

definePageMeta({
  middleware: ["auth"],
});

async function next() {
  const nextPage = Number(res.value.meta.currentPage) + 1;

  const { data } = await useFetch<IRes>(
    `http://localhost:4000/api/users/disables?page=${nextPage}`
  );

  res.value = data.value;
}

async function previous() {
  const prevPage = Number(res.value.meta.currentPage) - 1;

  const { data } = await useFetch<IRes>(
    `http://localhost:4000/api/users/disables?page=${prevPage}`
  );

  res.value = data.value;
}

const loading = ref(false);
async function onEnableAccount(id: string) {
  loading.value = true;

  const { status } = useFetch(
    `http://localhost:4000/api/users/active/${id}`,
    {
      method: "PATCH",
    }
  );

  loading.value = false;

  if (status.value === "success") {
    toast.success("Conta activada com sucesso!");
    return;
  }

  toast.error("Não foi possível activar a conta!");
}
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <section class="mt-4 mb-8">
      <h3 class="mb-4">Utilizadores Desactivados</h3>

      <div class="w-full grid grid-cols-12">
        <div class="col-span-12">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="px-4 bg-neutral-300/60 uppercase rounded-tl-lg">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    Nome
                  </p>
                </th>
                <th class="p-4 bg-neutral-300/60 uppercase">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    E-mail
                  </p>
                </th>
                <th class="p-4 bg-neutral-300/60 uppercase">
                  <p
                    class="antialiased leading-none text-neutral-600 font-medium"
                  >
                    Tipo de conta
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
              <template v-if="res.data.length > 0">
                <tr v-for="(u, idx) in res.data" :key="idx">
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ u.firstName }} {{ u.lastName }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ u.email }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <p class="antialiased font-normal text-neutral-600">
                      {{ u.accountType }}
                    </p>
                  </td>
                  <td class="px-4 p-2.5 border-b border-neutral-200">
                    <div class="flex gap-2">
                      <button
                        @click="onEnableAccount(u.id)"
                        class="block antialiased text-white font-medium bg-brand-primary p-2 rounded-md"
                      >
                        <Icon v-if="loading" name="svg-spinners:ring-resize" />
                        Activar
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="4" class="h-64 text-center">
                    <p>Nenhum utilizador cadastrado no momento!</p>
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
      </div>
    </section>
  </main>
</template>
