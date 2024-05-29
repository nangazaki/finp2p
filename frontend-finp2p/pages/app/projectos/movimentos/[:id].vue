<script setup lang="ts">
const { data: project } = await useFetch(
  `http://localhost:4000/api/project/${useRoute().params.id}`
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
      <h2 class="mb-3">Estado Financeiro do Projecto - {{ project.name }}</h2>

      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3">
          <div class="mb-3">
            <span class="font-semibold">Total a pagar</span>
            <p>AOA {XX.XXX.XXX,XX}</p>
          </div>
          <div class="mb-3">
            <span class="font-semibold">Total pago - até o momento</span>
            <p>AOA {XX.XXX.XXX,XX}</p>
          </div>
          <div class="mb-3">
            <span class="font-semibold">Parcelamento</span>
            <p>
              O projecto {nome do projecto} foi parcelado em
              <strong>x vezes</strong> e neste momento já foi pago a {1ª}
              prestação.
            </p>
          </div>
          <div>
            <button>
              <Icon name="heroicons:arrow-down-tray-solid" /> Baixar relatório
            </button>
          </div>
        </div>
        <div class="col-span-9">
          <h5 class="mb-2">Histórico de Pagamentos</h5>

          <table class="w-full">
            <thead>
              <tr class="bg-brand-primary divide-x-[1px]">
                <td class="py-1 px-2 text-white rounded-tl-md">Parcela</td>
                <td class="py-1 px-2 text-white">Montante Pago</td>
                <td class="py-1 px-2 text-white">Montante à Pagar</td>
                <td class="py-1 px-2 text-white rounded-tr-md">
                  Data do Pagamentos
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="idx in 5" :key="idx">
                <td class="py-1 px-2">1ª Parcela</td>
                <td class="py-1 px-2">AOA 400.000,00</td>
                <td class="py-1 px-2">AOA 7.000.000,00</td>
                <td class="py-1 px-2">24/05/2024</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="bg-neutral-200 h-7 rounded-b-md"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>
