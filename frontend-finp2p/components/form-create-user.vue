<script setup lang="ts">
import { toast } from "vue3-toastify";

const step = ref(1);

const entity = ref({
  entity_name: "",
  entity_nif: "",
  entity_email: "",
  entity_ministry: "",
});
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  accountType: "",
});

const loading = ref(false);
const onSubmit = async () => {
  loading.value = true;

  const { data, status, error } = await useFetch(
    "https://finp2p.onrender.com/api/users",
    {
      method: "POST",
      body: {
        ...form.value,
        ...entity.value,
      },
    }
  );

  loading.value = false;

  if (status.value === "success") {
    modal.value = true;
    return;
  }

  toast.error(error.value?.data.message);
};

const modal = ref(false);
const target = ref<HTMLElement | null>(null);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex justify-center gap-2 my-2">
      <div
        class="w-full text-center p-1.5 bg-neutral-300 rounded-md"
        :class="{
          'bg-gradient-to-tr from-green-400 to-green-600 text-white': step >= 1,
        }"
      >
        1º Passo
      </div>
      <div
        class="w-full text-center p-1.5 bg-neutral-300 rounded-md"
        :class="{
          'bg-gradient-to-tr from-green-400 to-green-600 text-white': step >= 2,
        }"
      >
        2º Passo
      </div>
    </div>
    <div v-if="step === 1">
      <div class="flex gap-2 mb-2">
        <div>
          <label
            for="firstName"
            class="text-base !text-neutral-500 font-medium block"
          >
            Nome
          </label>
          <input
            required
            type="text"
            name="firstName"
            id="firstName"
            v-model="form.firstName"
            placeholder="Endereço de e-mail"
            class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
          />
        </div>
        <div>
          <label
            for="lastName"
            class="text-base !text-neutral-500 font-medium block"
          >
            Sobrenome
          </label>
          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            v-model="form.lastName"
            placeholder="Sobrenome"
            class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
          />
        </div>
      </div>
      <div class="mb-2">
        <label
          for="email"
          class="text-base !text-neutral-500 font-medium block"
        >
          E-mail
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          placeholder="Seu email"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
      <div class="mb-2">
        <label
          for="accountType"
          class="text-base !text-neutral-500 font-medium block"
        >
          Tipo de conta
        </label>
        <select
          id="accountType"
          name="accountType"
          v-model="form.accountType"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        >
          <option value="" disabled>Escolhe o tipo de conta</option>
          <option value="particular">Particular</option>
          <option value="financial">Entidade Financeira</option>
          <option value="state_owned">Entidade Estatal</option>
        </select>
      </div>
      <div class="mb-2">
        <label
          for="password"
          class="text-base !text-neutral-500 font-medium block"
        >
          Password
        </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          v-model="form.password"
          placeholder="**********"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
    </div>

    <div v-if="step === 2">
      <div class="mb-2">
        <label
          for="entity_name"
          class="text-base !text-neutral-500 font-medium block"
        >
          Nome da Entidade
        </label>
        <input
          required
          type="text"
          name="entity_name"
          id="entity_name"
          v-model="entity.entity_name"
          placeholder="Nome da Entidade"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
      <div class="mb-2" v-if="form.accountType === 'state_owned'">
        <label
          for="entity_ministry"
          class="text-base !text-neutral-500 font-medium block"
        >
          Ministério Associado
        </label>
        <input
          required
          type="text"
          name="entity_ministry"
          id="entity_ministry"
          v-model="entity.entity_ministry"
          placeholder="Nome da Entidade"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
      <div class="mb-2">
        <label
          for="entity_nif"
          class="text-base !text-neutral-500 font-medium block"
        >
          NIF da Entidade
        </label>
        <input
          type="text"
          id="entity_nif"
          name="entity_nif"
          v-model="entity.entity_nif"
          placeholder="NIF da Entidade"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
      <div class="mb-2">
        <label
          for="entity_email"
          class="text-base !text-neutral-500 font-medium block"
        >
          Email da Entidade
        </label>
        <input
          required
          type="email"
          name="entity_email"
          id="entity_email"
          v-model="entity.entity_email"
          placeholder="Email da Entidade"
          class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
        />
      </div>
    </div>

    <div class="flex mt-3">
      <button
        v-show="step === 1"
        :type="`${form.accountType === 'particular' ? 'submit' : 'button'}`"
        @click="() => (form.accountType === 'particular' ? '' : (step += 1))"
        class="group flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 border-brand-primary bg-brand-primary text-lg text-white rounded-md hover:bg-brand-primary-darker focus:outline-none"
      >
        <Icon name="svg-spinners:ring-resize" v-show="loading" />
        {{ form.accountType === "particular" ? "Cadastrar" : "Avançar" }}
      </button>
      <div v-show="step === 2" class="w-full flex gap-2">
        <button
          type="button"
          @click="() => (step -= 1)"
          class="w-full flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 bg-neutral-400 text-lg text-white transition-all rounded-md hover:bg-neutral-500 focus:outline-none"
        >
          Voltar
        </button>
        <button
          v-show="step === 2"
          type="submit"
          class="w-full flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 border-brand-primary bg-brand-primary text-lg text-white transition-all rounded-md hover:bg-brand-primary-darker"
        >
          <Icon name="svg-spinners:ring-resize" v-show="loading" />
          Criar conta
        </button>
      </div>
    </div>
    <div class="mt-3 text-center">
      <p>
        Possui uma conta?
        <nuxt-link
          to="/app/auth/login"
          class="font-medium hover:text-brand-primary"
        >
          Entrar
        </nuxt-link>
      </p>
    </div>
  </form>
  <div
    v-if="modal"
    class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50"
  >
    <div class="w-screen h-screen flex justify-center items-center p-6">
      <div ref="target" class="bg-white max-w-xl p-4 rounded-xl">
        <h3 class="font-medium text-center">
          Utilizador Registrado com Sucesso! 🎉
        </h3>

        <hr class="my-3" />

        <div v-if="form.accountType === 'financial'">
          <p class="mb-2">
            Para garantir a segurança e a confiança de todos os nossos
            utilizadores, contas de entidades financeiras requerem aprovação
            antes de serem ativadas.
          </p>

          <p class="font-semibold">O que isso significa?</p>
          <ul class="pl-6 list-disc">
            <li class="mb-1">
              Sua conta será revisada por nossos administradores para assegurar
              que atende aos nossos critérios de transparência e segurança.
            </li>
            <li class="mb-2">
              Este processo pode levar alguns dias, e nós notificaremos você
              assim que a revisão for concluída.
            </li>
          </ul>
        </div>

        <div v-if="form.accountType === 'state_owned'">
          <p class="mb-2">
            Para garantir a segurança e a confiança de todos os nossos
            utilizadores, contas de entidades estatais requerem aprovação antes
            de serem ativadas.
          </p>

          <p class="font-semibold">O que isso significa?</p>
          <ul class="pl-6 list-disc">
            <li class="mb-1">
              Sua conta será revisada por nossos administradores para assegurar
              que atende aos nossos critérios de transparência e legitimidade.
            </li>
            <li class="mb-2">
              Este processo pode levar alguns dias, e nós notificaremos você
              assim que a revisão for concluída.
            </li>
          </ul>
        </div>

        <div v-if="form.accountType === 'particular'">
          <p class="mb-2">
            Para completar o processo de verificação e garantir a segurança da
            sua conta, por favor envie os seguintes documentos para o nosso
            e-mail:
          </p>

          <ul class="pl-6 list-disc mb-2">
            <li class="mb-1">Extrato bancário atualizado</li>
            <li class="mb-2">Cópia do seu bilhete de identidade</li>
          </ul>

          <p class="mb-2">E-mail para envio: <b> verificacao@finp2p.ao </b></p>

          <p class="mb-2">
            Certifique-se de que todos os documentos estejam legíveis e
            atualizados. Isso ajudará a acelerar o processo de verificação.
          </p>
        </div>

        <p>
          Agradecemos pela paciência e compreensão enquanto trabalhamos juntos
          para manter uma plataforma confiável para todos.
        </p>

        <hr class="my-3" />

        <button
          @click="
            () => {
              navigateTo('/app/auth/login');
              modal = false;
            }
          "
          class="px-4 py-2.5 rounded-md text-white bg-brand-primary transition-all hover:bg-brand-primary-darker"
        >
          Compreendi
        </button>
      </div>
    </div>
  </div>
</template>
