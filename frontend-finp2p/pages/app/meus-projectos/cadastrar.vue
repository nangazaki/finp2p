<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

definePageMeta({
  middleware: ["auth"],
});

const modal = ref(false);
const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => (modal.value = false));

const form = ref({
  name: "",
  type: "",
  amountRequired: 0,
  image: <File | string>"",
  description: "",
});

const loading = ref(false);
async function onSubmit() {
  loading.value = true;
  const formData = new FormData();

  formData.append("name", form.value.name);
  formData.append("type", form.value.type);
  formData.append("amountRequired", `${form.value.amountRequired}`);
  formData.append("image", form.value.image);
  formData.append("description", form.value.description);

  await useFetch("https://finp2p.onrender.com/api/project", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authCookie.getToken()}`,
    },
    body: formData,
    onResponse: ({ response, error }) => {
      loading.value = false;

      if (response.ok) {
        modal.value = true;

        return;
      }

      toast.error("Não foi possível criar o projecto");
    },
  });
}

function onLoadImage(e) {
  const file = e.target.files[0];

  form.value.image = file;
}
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <section class="mt-4 mb-8">
      <h3 class="mb-4">Cadastrar Projecto</h3>

      <div class="w-full grid grid-cols-12">
        <form
          @submit.prevent="onSubmit"
          class="col-span-12 !bg-white p-3 !border rounded-md"
        >
          <div class="flex gap-4 mb-3">
            <div class="w-full">
              <label
                for="name"
                class="text-base !text-neutral-500 font-medium block"
              >
                Nome do Projecto
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Nome do projecto"
                v-model="form.name"
                class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
            <div class="w-full">
              <label
                for="type"
                class="text-base !text-neutral-500 font-medium block"
              >
                Categoria / Tipo
              </label>
              <input
                required
                type="text"
                name="type"
                id="type"
                placeholder="Categoria do projecto"
                v-model="form.type"
                class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
          </div>
          <div class="flex gap-4 mb-3">
            <div class="w-full">
              <label
                for="amountRequired"
                class="text-base !text-neutral-500 font-medium block"
              >
                Valor necessário
              </label>
              <input
                required
                type="number"
                name="amountRequired"
                id="amountRequired"
                placeholder="2.000.000,00"
                v-model="form.amountRequired"
                class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
            <div class="w-full">
              <label
                for="image"
                class="text-base !text-neutral-500 font-medium block"
              >
                Fotografia / Capa
              </label>
              <input
                required
                type="file"
                name="image"
                id="image"
                accept="image/*"
                @change="onLoadImage"
                class="w-full p-1.5 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Descrição do projecto"
            v-model="form.description"
            class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
          />

          <div class="mt-3 w-full">
            <button
              type="submit"
              svg-spinners:ring-resize
              class="mx-auto min-w-80 flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 border-brand-primary bg-brand-primary text-lg text-white rounded-md hover:bg-brand-primary-darker focus:outline-none"
            >
              <Icon name="svg-spinners:ring-resize" v-show="loading" />
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>

    <div
      v-if="modal"
      class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50"
    >
      <div class="w-screen h-screen flex justify-center items-center p-6">
        <div ref="target" class="bg-white max-w-xl p-4 rounded-xl">
          <h3 class="font-medium text-center">
            Parabéns! Seu Projeto foi Registrado com Sucesso! 🎉
          </h3>

          <hr class="my-3" />

          <p class="mb-1">
            Em breve, nossa equipe realizará uma avaliação detalhada do seu
            projeto. Nos próximos 48 horas, vamos analisar cuidadosamente seu
            potencial e impacto.
          </p>
          <p class="mb-1">
            ✅ Se tudo estiver em conformidade, avançaremos com a aprovação do
            seu projeto, permitindo que você dê o próximo passo rumo ao sucesso.
          </p>
          <p>
            🌟 Obrigado por escolher nossa plataforma para dar vida às suas
            ideias. Estamos aqui para apoiá-lo em cada etapa do processo.
          </p>

          <hr class="my-3" />

          <button
            @click="
              () => {
                modal = false;
                navigateTo('/app/meus-projectos');
              }
            "
            class="px-4 py-2.5 rounded-md text-white bg-brand-primary transition-all hover:bg-brand-primary-darker"
          >
            Compreendi
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
