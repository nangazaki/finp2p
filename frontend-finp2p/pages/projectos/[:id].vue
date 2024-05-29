<script setup lang="ts">
const { data: project } = await useFetch(
  `http://localhost:4000/api/project/${useRoute().params.id}`
);

definePageMeta({
  layout: "website",
});
</script>

<template>
  <ModalInvestir />
  <section class="project">
    <div
      class="min-h-[28rem] max-w-screen-xl mx-auto flex flex-col justify-center items-center text-white"
    >
      <h3 class="font-medium">Informações sobre o projecto</h3>
      <h1>{{ project.name }}o</h1>
    </div>
  </section>
  <section class="bg-brand-primary/5 py-16">
    <div class="max-w-screen-xl mx-auto grid grid-cols-12 gap-6">
      <div class="col-span-8">
        <div class="p-4">
          <div class="mb-4">
            <h3 class="mb-2">Sobre o projecto</h3>

            <div v-html="project.description" class="mb-1"></div>
          </div>
          <div class="mb-4">
            <h4 class="mb-2">Investimento necessário</h4>
            <p>
              Para a concretização do projecto {nome do projecto} será
              necessário: <b> {{ currencyFormat(project.amountRequired) }}</b>
            </p>
          </div>
          <div class="mb-4">
            <h4 class="mb-2">Como posso investir?</h4>
            <p class="mb-1">
              Para investir no projecto <b>{{ project.name }} </b> é muito
              simples, basta efectuar os seguintes passos:
            </p>
            <ol class="list-decimal pl-10">
              <li>Efectuar o depósito na Referência: 2232320015</li>
              <li>Clicar no butão <b>Investir no projecto</b></li>
              <li>Selecionar o tipo de conta</li>
              <li>Preencher o formulário de investimento</li>
              <li>Carregar o comprovativo do pagamento</li>
              <li>Clicar em efectuar o investimento</li>
            </ol>
          </div>
          <!-- <div>
            <h4 class="mb-2">Quais serão as vantagens?</h4>
          </div> -->
        </div>
      </div>
      <div class="col-span-4">
        <div
          class="p-4 bg-white rounded-2xl border !border-neutral-200 shadow-sm"
        >
          <h4 class="mb-3">Investir no projecto</h4>

          <p class="mb-6">
            Ao investir no projecto {nome do projecto}, você estará concordado
            com os nossos termos e políticas relacionadas ao investivestimentos
            e activos.
          </p>

          <nuxt-link
            to="/app/auth/login"
            class="leading-none bg-brand-primary px-4 py-3 rounded-full text-white hover:bg-brand-primary-darker"
          >
            Investir no projecto
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
