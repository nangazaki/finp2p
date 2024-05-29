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
          <div
            v-if="project.amountRequired - project.amountCollected === 0"
            class="bg-yellow-300/30 text-yellow-900 p-3 mb-3 rounded-md flex items-center gap-2"
          >
            <Icon name="heroicons:information-circle" size="18" />
            <p class="leading-none">
              Os investimentos nesse projecto já estão fechados. Já foi
              alcançado o valor necessário!
            </p>
          </div>

          <div class="mb-4">
            <h5 class="mb-2">💡 Tipo de Projeto</h5>
            <p>{{ project.type }}</p>
          </div>
          <div class="mb-4">
            <h5 class="mb-2">💰 Valor de Investimento</h5>
            <p>
              Seja o catalisador da mudança com um investimento a partir de
              <b>{{ currencyFormat(project.amountRequired / 4) }}</b
              >. Nosso objetivo é atingir
              <b>{{ currencyFormat(project.amountRequired) }}</b> e cada
              contribuição nos aproxima mais desse marco importante.
            </p>
          </div>
          <div class="mb-4">
            <h5 class="mb-2">📅 Data necessária para conclusão</h5>
            <p>
              Estamos em uma contagem regressiva emocionante, com
              <strong
                >{{ calculateTimeRemaining(project.createdAt) }} meses</strong
              >
              até a realização deste projeto revolucionário. Sua participação é
              essencial para alcançarmos juntos esse objetivo.
            </p>
          </div>
          <div class="mb-4">
            <h5 class="mb-2">🌍 Descrição</h5>
            <p class="mb-1" v-html="project.description"></p>

            <p>
              Quer ser lembrado como alguém que fez a diferença? Esta é a sua
              chance! Ao investir neste projeto, você está investindo em um
              futuro melhor para todos nós. Venha fazer parte desta história de
              sucesso e deixe seu impacto duradouro no mundo. Junte-se a nós e
              seja parte da mudança que quer ver no mundo!
            </p>
          </div>

          <div class="mb-4">
            <h5 class="mb-2">💳 Como Investir?</h5>
            <p class="">
              É simples! Siga estes passos para fazer seu investimento:
            </p>

            <ol class="list-decimal pl-8">
              <li>
                Clique em <b>Gerar Referência</b> para poder gerar uma
                referencia de pagamento;
              </li>
              <li>
                Dirija-se ao caixa electrônico mais próximo, insira o seu cartão
                no multicaixa e digite o seu código pessoal secreto.
              </li>
              <li>Escolha a opção “PAGAMENTOS”.</li>
              <li>Escolha a opção “PAGAMENTOS POR REFERÊNCIA”.</li>
              <li>
                Introduza o código da entidade <b>FinP2P</b> - "00713" e
                “Confirmar”.
              </li>
              <li>Introduza a referência de pagamento gerado e “Confirmar”.</li>
            </ol>

            <p class="mt-1.5">
              Att. Também pode ser efectuado a partir dos canais digitais das
              entidades financeiras.
            </p>
          </div>
        </div>
        <div class="col-span-4">
          <div class="bg-white min-h-[20rem] p-3 !border rounded-xl">
            <div class="mb-4">
              <h5 class="mb-2">Estado Financeiro</h5>

              <div class="flex flex-col">
                <nuxt-link
                  to="#"
                  class="text-neutral-700 hover:text-brand-primary"
                >
                  Ver Histórico de Pagamentos
                </nuxt-link>
              </div>
            </div>

            <div>
              <h5 class="mb-2">Investir no Projecto</h5>

              <p class="mb-2">
                Ao investir no projecto <b>{{ project.name }}</b
                >, você estará concordado com os nossos termos e políticas
                relacionadas ao investivestimentos e activos.
              </p>

              <div class="flex gap-2 flex-wrap">
                <button
                  v-if="project.amountRequired - project.amountCollected !== 0"
                  @click="useAppModalStore().onModalReference(true)"
                  class="px-4 py-2.5 rounded-md text-brand-primary !border border-brand-primary transition-all hover:bg-brand-primary hover:text-white"
                >
                  Gerar Referência
                </button>

                <button
                  v-if="project.amountRequired - project.amountCollected !== 0"
                  @click="useAppModalStore().onModalInvestir({ state: true })"
                  class="px-4 py-2.5 rounded-md text-white bg-brand-primary transition-all hover:bg-brand-primary-darker"
                >
                  Invistir no projecto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ui-modal-investir
      :project-id="project.id"
      :max-amount="project.amountRequired"
    />

    <ui-modal-referencia
      :project-id="project.id"
      :max-amount="project.amountRequired"
    />
  </main>
</template>
