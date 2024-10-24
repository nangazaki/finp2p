<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";
import type { ModalProject } from "@stores/app.modal";

const cancel: ModalProject = { state: false, info: { name: "", id: "" } };
const modal = computed(() => useAppModalStore().modalAceptProject);

const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => {
  useAppModalStore().onModalAceptProject(cancel);
});

const loading = ref(false);
async function onSubmit() {
  loading.value = true;

  const { status } = await useFetch(
    `http://localhost:4000/api/project/${modal.value.info.id}/approve`,
    {
      method: "PATCH",
    }
  );

  loading.value = false;

  if (status.value === "success") {
    toast.success("Projecto aprovado com sucesso!");
    setTimeout(() => {
      navigateTo("/app/projectos");
    }, 3000);
    return;
  }

  toast.error("Não foi possível aprovar o projecto");
}

onUnmounted(() => {
  useAppModalStore().onModalAceptProject(cancel);
});
</script>

<template>
  <div v-if="modal?.state" class="modal-bg">
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        ref="target"
        class="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div
          class="flex items-center p-4 font-sans text-xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900"
        >
          Aprovar o Projecto - {{ modal.info.name }}
        </div>
        <div
          class="relative p-4 font-sans antialiased leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500"
        >
          Ao aprovar este projecto, você irá permitir que ele receba
          investimentos e aparece na secção <strong>Projectos</strong> do site
          principal. Deseja continuar?
        </div>
        <div
          class="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500"
        >
          <button
            @click="useAppModalStore().onModalAceptProject(cancel)"
            class="p-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Cancelar
          </button>
          <button
            @click="onSubmit"
            class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <Icon v-show="loading" name="svg-spinners:ring-resize" />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
