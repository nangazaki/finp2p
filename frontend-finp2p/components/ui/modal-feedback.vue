<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

const modal = computed(() => useAppModalStore().modalFeedback);

const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => {
  closeModal();
});

function closeModal() {
  useAppModalStore().onModalFeedback({
    info: { name: "", id: "", email: "", message: "", createdAt: "" },
    state: false,
  });
}

const loading = ref(false);
async function onDelete() {
  loading.value = true;
  const { status, error } = await useFetch(
    `https://finp2p.onrender.com/api/feedback/${modal.value?.info.id}`,
    {
      method: "DELETE",
    }
  );
  loading.value = false;

  if (status.value === "success") {
    toast.success("Feedback deletado com sucesso!", {
      onClose(props) {
        closeModal();
        reloadNuxtApp();
      },
    });
    return;
  }

  toast.error("Não foi possível deletar o feedback");
}
</script>

<template>
  <div
    v-if="modal?.state"
    class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div ref="target" class="bg-white max-w-lg w-full p-4 rounded-lg">
        <div class="text-center mb-4">
          <h4>Feedback de {{ modal?.info.name }}</h4>
        </div>

        <div>
          <div class="mb-2">
            <span class="text-base font-semibold !text-neutral-500">
              Nome
            </span>
            <p class="text-base !text-neutral-500">{{ modal?.info.name }}</p>
          </div>
          <div class="mb-2">
            <span class="text-base font-semibold !text-neutral-500">
              E-mail
            </span>
            <p class="text-base !text-neutral-500">{{ modal?.info.email }}</p>
          </div>
          <div class="mb-2">
            <span class="text-base font-semibold !text-neutral-500">
              Mensagem
            </span>
            <p class="!text-neutral-500">
              {{ modal?.info.message }}
            </p>
          </div>
          <div class="mb-4">
            <p class="!text-neutral-500">
              <span class="text-base font-semibold !text-neutral-500">
                Enviada há:
              </span>
              {{ distanceToNow(modal?.info.createdAt) }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="onDelete"
              class="flex-1 font-medium p-2 border-2 border-red-500 bg-red-500 text-white rounded hover:!text-red-500 hover:bg-transparent"
            >
              <Icon v-show="loading" name="svg-spinners:ring-resize" />
              Eliminar
            </button>
            <button
              @click="closeModal"
              class="flex-1 font-medium p-2 border-2 border-brand-primary bg-brand-primary text-white rounded hover:!text-brand-primary hover:bg-transparent"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
