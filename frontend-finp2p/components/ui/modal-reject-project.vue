<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { ModalProject } from "@stores/app.modal";

const cancel: ModalProject = { state: false, info: { name: "", id: "" } };
const modal = computed(() => useAppModalStore().modalRejectProject);

const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => {
  useAppModalStore().onModalRejectProject(cancel);
});

function onSubmit() {
  // Chamada 
}
</script>

<template>
  <div v-if="modal?.state" class="modal-bg">
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        ref="target"
        class="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div
          class="flex items-center p-4 text-xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900"
        >
          Rejeitar o Projecto - {{ modal.info.name }}
        </div>
        <div
          class="relative px-4 pt-4 mb-2 antialiased leading-relaxed border-t"
        >
          Ao aprovar este projecto, você não irá permitir que ele receba
          investimentos e apareça na secção <strong>Projectos</strong> do site
          principal.
        </div>
        <div class="relative px-4 pb-4 antialiased leading-relaxed border-b">
          O usuário irá receber um email notificando que o seu projecto foi
          recusado! Deseja continuar?
        </div>
        <div
          class="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500"
        >
          <button
            @click="useAppModalStore().onModalRejectProject(cancel)"
            class="p-3 mr-1 text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Cancelar
          </button>
          <button
            @click="onSubmit"
            class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 p-3 text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
