<script setup lang="ts">
const { data: project } = await useFetch(
  `https://finp2p.onrender.com/api/project/${useRoute().params.id}`
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
      <div class="relative w-full h-80 rounded-xl overflow-hidden">
        <img
          :src="`https://ugxrutmbdnievlqtuyng.supabase.co/storage/v1/object/public/uploads/finp2p/${project.image}`"
          class="w-full h-full object-cover object-center"
        />
        <div
          class="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-black/60"
        />
        <h3 class="absolute bottom-0 left-10 text-white mb-4">
          Projecto - {{ project.name }}
        </h3>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-8">
        <div class="col-span-8 p-3">
          <div class="mb-3">
            <h5 class="mb-1">Tipo de Projecto</h5>
            <p>{{ project.type }}</p>
          </div>
          <div class="mb-3">
            <h5 class="mb-1">Data necessária para conclusão</h5>
            <p>
              1 ano, faltam
              <strong
                >{{ calculateTimeRemaining(project.createdAt) }} meses</strong
              >
              para a conclusão
            </p>
          </div>
          <div class="mb-3">
            <h5 class="mb-1">Total a ser pago</h5>
            <p>
              {{
                currencyFormat(
                  project?.ReferencePaymentFromProjectToSystem[0].amount
                )
              }}
            </p>
          </div>
          <div class="mb-3">
            <h5 class="mb-1">Descrição</h5>
            <div v-html="project.description"></div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="bg-white min-h-[20rem] p-3 !border">
            <div class="mb-3">
              <h5 class="mb-2">Estado Financeiro</h5>

              <div>
                <!-- <nuxt-link
                  :to="{ path: `/app/projectos/movimentos/${project.id}` }"
                  class="text-neutral-700 hover:text-brand-primary"
                >
                  Ver Histórico de Pagamentos
                </nuxt-link> -->
                
                <button
                  @click="useAppModalStore().onModalPayment(true)"
                  class="mt-2 px-4 py-2.5 rounded-md text-white bg-brand-primary transition-all hover:bg-brand-primary-darker"
                >
                  Realizar pagamento trimestral
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ui-modal-payment
      :project-id="project.id"
      :project-name="project.name"
      :reference="project.ReferencePaymentFromProjectToSystem[0].reference"
    />
  </main>
</template>
