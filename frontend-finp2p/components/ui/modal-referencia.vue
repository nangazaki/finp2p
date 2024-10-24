<script setup lang="ts">
import { toast } from "vue3-toastify";

const { projectId, maxAmount } = defineProps<{
  projectId: string;
  maxAmount: number;
}>();

const modal = computed(() => useAppModalStore().modalReference);
const user = useAppUserStore().user;

function closeModal() {
  useAppModalStore().onModalReference(false);
}

const reference = ref<number | undefined>(undefined);

const form = ref({
  name: `${user?.firstName} ${user?.lastName}`,
  email: `${user?.email}`,
  amount: 0,
  projectId: projectId,
});

const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const { data, status, error } = await useFetch<number>(
    "http://localhost:4000/api/investments/generate-reference",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${authCookie.getToken()}`,
      },
      body: form.value,
    }
  );
  loading.value = false;

  if (status.value === "success") {
    reference.value = data.value;
    toast.success("Referência gerada com sucesso!");
    return;
  }

  toast.error(error.value?.data.message);
}
</script>

<template>
  <div
    v-if="modal"
    class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="bg-white max-w-lg w-full p-4 rounded-lg">
        <div class="text-center mb-3">
          <h4>Gerar Referência</h4>
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
              <label for="amount" class="!text-neutral-600 font-medium block">
                Valor à investir
              </label>
              <input
                required
                type="number"
                name="amount"
                id="amount"
                step="any"
                :min="maxAmount / 4"
                :max="maxAmount"
                v-model="form.amount"
                placeholder="5000000"
                class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
              />
            </div>
            <div class="mb-2 flex items-center gap-1">
              <input required type="checkbox" name="agree" id="agree" />
              <label for="agree" class="!text-neutral-600 cursor-pointer">
                Concordo com os termos da plataforma
              </label>
            </div>
            <div
              v-if="reference"
              class="mb-4 border-2 border-dashed border-neutral-500 py-4 text-center rounded-md"
            >
              <p class="text-lg">
                Referência: <b>{{ reference }}</b>
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                @click="closeModal"
                class="w-full flex-1 flex items-center justify-center gap-2 leading-none py-2.5 bg-red-500 text-base text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Fechar
              </button>
              <button
                type="submit"
                v-if="!reference"
                class="w-full flex-1 flex items-center justify-center gap-2 leading-none py-2.5 bg-brand-primary text-base text-white rounded-md hover:bg-brand-primary-darker focus:outline-none"
              >
                <Icon name="svg-spinners:ring-resize" v-show="loading" />
                Gerar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
