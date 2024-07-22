<script setup lang="ts">
definePageMeta({
  layout: "website",
});
</script>

<template>
  <section
    class="w-screen h-[calc(100vh-64px)] flex items-center hero px-6 py-10"
  >
    <div class="max-w-screen-xl w-full mx-auto">
      <div class="max-w-2xl">
        <h1 class="mb-4">
          <span class="text-brand-primary">
            Conectando investidores e tomadores de empréstimos
          </span>
          <br />
          <span class=""> Sem banco, sem complicações! </span>
        </h1>

        <div class="flex flex-wrap gap-2">
          <nuxt-link to="/app/auth/login">
            <button
              class="leading-none px-4 py-3 bg-brand-primary text-white text-base rounded-md transition-all hover:opacity-80"
            >
              Quero um empréstimo
            </button>
          </nuxt-link>

          <nuxt-link to="/app/auth/login">
            <button
              class="leading-none px-4 py-3 bg-brand-secondary text-black text-base rounded-md transition-all hover:opacity-80"
            >
              Quero emprestar
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
  <section class="w-screen px-6 py-16">
    <div class="max-w-screen-xl mx-auto">
      <div class="mb-10">
        <h1 class="text-brand-primary font-medium">É bem simples!</h1>
        <h3 class="font-normal">Veja como funciona</h3>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="py-2 px-4 col-span-12 md:col-span-6 lg:col-span-3 text-center">
          <div class="mb-3">
            <img src="/public/images/empestimo.svg" class="h-24 mx-auto" />
          </div>
          <p>Empresa cria uma solicitação do empréstimo na plataforma</p>
        </div>
        <div class="py-2 px-4 col-span-12 md:col-span-6 lg:col-span-3 text-center">
          <div class="mb-3">
            <img src="/public/images/papelada.svg" class="h-24 mx-auto" />
          </div>
          <p>
            Submetemos ao nosso modelo proprietário de crédito, se aprovada
            oferecemos aos investidores
          </p>
        </div>
        <div class="py-2 px-4 col-span-12 md:col-span-6 lg:col-span-3 text-center">
          <div class="mb-3">
            <img src="/public/images/credor.svg" class="h-24 mx-auto" />
          </div>
          <p>
            Investidores registram seu interesse e com quanto participariam no
            financiamento
          </p>
        </div>
        <div class="py-2 px-4 col-span-12 md:col-span-6 lg:col-span-3 text-center">
          <div class="mb-3">
            <img src="/public/images/investimento.svg" class="h-24 mx-auto" />
          </div>
          <p>
            Feito a combinação das partes, a empresa recebe seu empréstimo e os
            investidores seus investimentos mensais
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    class="w-screen px-6 pt-5 bg-gradient-to-bl to-brand-primary-darker from-brand-secondary"
  >
    <div class="max-w-screen-xl mx-auto">
      <div
        class="w-full flex gap-4 flex-col lg:flex-row justify-between items-center"
      >
        <div class="text-white">
          <h1 class="font-medium mb-3">Olá, Credor!</h1>
          <p class="text-base mb-2">
            Aqui o investimento é rentável e com retornos mensais.
          </p>
          <p class="text-base mb-1">Confira alguma de nossas vantagens:</p>

          <ul class="pl-3 mb-4">
            <li class="mb-1">
              <Icon
                name="heroicons:check-badge-16-solid"
                size="18"
                class="mr-2"
              />
              Acesso facilitado, sem burocracia, 100% segura com contratação
              online;
            </li>
            <li class="mb-1">
              <Icon
                name="heroicons:check-badge-16-solid"
                size="18"
                class="mr-2"
              />
              Mitigação de riscos (modelo proprietário de crédito sofisticado);
            </li>
            <li class="mb-1">
              <Icon
                name="heroicons:check-badge-16-solid"
                size="18"
                class="mr-2"
              />
              Recebimento anual do investimento.
            </li>
          </ul>

          <nuxt-link
            to="/app/auth/login"
            class="block max-w-44 text-center leading-none px-4 py-3 text-neutral-800 text-base bg-white rounded-md transition-all hover:!bg-neutral-700"
          >
            Quero investir
          </nuxt-link>
        </div>
        <div>
          <img src="/public/images/medium.svg" class="max-w-sm lg:max-w-md" />
        </div>
      </div>
    </div>
  </section>
  <section class="w-screen px-6 py-10">
    <div class="max-w-screen-xl mx-auto">
      <div
        class="w-full flex gap-4 flex-col lg:flex-row justify-between items-center"
      >
        <div>
          <img src="/public/images/bg-credor.svg" class="max-w-sm lg:max-w-md" />
        </div>
        <div class="">
          <h1 class="font-medium mb-3">Olá, Empresário!</h1>
          <p class="text-base mb-2">
            Aqui o investimento é rentável e com retornos mensais.
          </p>
          <p class="text-base mb-1">Confira alguma de nossas vantagens:</p>

          <ul class="pl-3 mb-4">
            <li class="mb-1">
              <Icon
                name="heroicons:check-badge-16-solid"
                size="18"
                class="mr-2"
              />
              Acesso facilitado, sem burocracia, 100% segura com contratação
              online;
            </li>
            <li class="mb-1">
              <Icon
                name="heroicons:check-badge-16-solid"
                size="18"
                class="mr-2"
              />
              Mitigação de riscos (modelo proprietário de crédito sofisticado);
            </li>
          </ul>

          <nuxt-link
            to="#"
            class="block max-w-56 text-center leading-none px-4 py-3 text-neutral-800 text-base text-nowrap border !border-brand-primary rounded-md hover:!bg-brand-primary"
          >
            Quero me cadastrar
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
  <depoimentos />
</template>
