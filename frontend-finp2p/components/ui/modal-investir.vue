<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

const { projectId, maxAmount } = defineProps<{
  projectId: string;
  maxAmount: number;
}>();

const modal = computed(() => useAppModalStore().modalInvestir);
const user = useAppUserStore().user;

const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => {
  closeModal();
});

function closeModal() {
  useAppModalStore().onModalInvestir({
    state: false,
  });
}

const form = ref({
  name: `${user?.firstName} ${user?.lastName}`,
  email: `${user?.email}`,
  reference: undefined,
  comprovante: "",
});

function onUploadFile(e) {
  const file = e.target.files[0];

  form.value.comprovante = file;
}

const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const formData = new FormData();

  formData.append("name", form.value.name);
  formData.append("email", form.value.email);
  formData.append("amount", `${form.value.amount}`);
  formData.append("reference", form.value.reference);
  formData.append("comprovante", form.value.comprovante);

  const { status, error } = await useFetch(
    "http://localhost:4000/api/investments",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${authCookie.getToken()}`,
      },
      body: formData,
    }
  );
  loading.value = false;

  if (status.value === "success") {
    toast.success("Você se tornou um investidor do Projecto", {
      onClose(props) {
        closeModal();
        reloadNuxtApp();
      },
    });
    return;
  }

  toast.error(error.value?.data.message);
}
</script>

<template>
  <div
    v-if="modal?.state"
    class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div ref="target" class="bg-white max-w-lg w-full p-4 rounded-lg">
        <div class="text-center mb-3">
          <h4>Investir no Projecto</h4>
        </div>
        <div>
          <form @submit.prevent="onSubmit">
            <div class="mb-2">
              <label for="name" class="!text-neutral-600 font-medium block">
                Nome completo
              </label>
              <input
                disabled
                type="text"
                name="name"
                id="name"
                :value="`${user?.firstName} ${user?.lastName}`"
                class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="!text-neutral-600 font-medium block">
                E-mail
              </label>
              <input
                disabled
                type="email"
                name="email"
                id="email"
                :value="user?.email"
                class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div class="mb-2">
              <label
                for="reference"
                class="!text-neutral-600 font-medium block"
              >
                Referência do Pagamento
              </label>
              <input
                required
                type="number"
                name="reference"
                id="reference"
                step="any"
                :max="999999999"
                v-model="form.reference"
                placeholder="002847256"
                class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
            <div class="mb-2">
              <label
                for="dropzone-file"
                class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl !border-2 border-dashed border-neutral-300 p-4 text-center"
                :class="{ 'bg-brand-primary/20': form.comprovante }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-brand-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <p class="mt-2 text-base text-neutral-700">
                  Comprovante do Pagamento
                </p>

                <p class="mt-2 max-w-[80%] leading-tight text-sm">
                  Carregue o seu comprovativo no formato SVG, PNG, JPG or GIF.
                </p>

                <input
                  required
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="onUploadFile"
                />
              </label>
            </div>
            <div class="mb-4 flex items-center gap-1">
              <input required type="checkbox" name="agree" id="agree" />
              <label for="agree" class="!text-neutral-600 cursor-pointer">
                Concordo com os termos da plataforma
              </label>
            </div>
            <div>
              <button
                type="submit"
                svg-spinners:ring-resize
                class="mx-auto min-w-80 flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 border-brand-primary bg-brand-primary text-base text-white rounded-md hover:bg-brand-primary-darker focus:outline-none"
              >
                <Icon name="svg-spinners:ring-resize" v-show="loading" />
                Investir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
