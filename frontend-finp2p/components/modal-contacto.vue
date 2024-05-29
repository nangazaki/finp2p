<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

const target = ref(null);
onClickOutside(target, (e) => {
  useAppModalStore().onModalContact(false);
});

const state = computed(() => useAppModalStore().modalContact);

const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const { status, error } = await useFetch(
    "http://localhost:4000/api/feedback",
    {
      method: "POST",
      body: form.value,
    }
  );

  loading.value = false;

  if (status.value === "success") {
    toast.success(
      "Recebemos a sua mensagem, assim que possível daremos um feedback",
      {
        delay: 3000,
        onClose(props) {
          useAppModalStore().onModalContact(false);
        },
      }
    );
    return;
  }

  toast.error("Não foi possível enviar o seu feedback");
}
</script>

<template>
  <div
    v-if="state"
    class="w-screen h-screen fixed z-50 top-0 left-0 bg-black/5 backdrop-blur"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        ref="target"
        class="max-w-lg w-full min-h-[30rem] p-4 bg-white !rounded-3xl shadow-sm !border"
      >
        <div class="mb-4">
          <h4 class="font-medium text-center mb-2">Alguma Dúvida?</h4>

          <p class="text-center">
            Fale connosco agora mesmo e entraremos em contato logo logo ;)
          </p>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label
              for="name"
              class="text-base !text-neutral-500 font-medium block"
            >
              Nome completo
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              v-model="form.name"
              placeholder="Nome completo"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
            />
          </div>
          <div class="mb-3">
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
              placeholder="Endereço de e-mail"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
            />
          </div>
          <div class="mb-3">
            <label
              for="message"
              class="text-base !text-neutral-500 font-medium block"
            >
              Mensagem
            </label>
            <textarea
              required
              name="message"
              id="message"
              rows="3"
              v-model="form.message"
              placeholder="Sua mensagem"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-400 rounded-lg resize-none"
            />
          </div>
          <div class="flex gap-3">
            <button
              type="button"
              @click="() => useAppModalStore().onModalContact(false)"
              class="flex-1 p-2 border-2 border-red-600/80 bg-red-600/80 text-lg text-white rounded-full hover:bg-transparent hover:!text-red-600/80 focus:outline-none"
            >
              Fechar
            </button>
            <button
              type="submit"
              class="flex-1 p-2 border-2 border-brand-primary bg-brand-primary text-lg text-white rounded-full hover:bg-transparent hover:!text-brand-primary focus:outline-none"
            >
              <Icon v-show="loading" name="svg-spinners:ring-resize" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
