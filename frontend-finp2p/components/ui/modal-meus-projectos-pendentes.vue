<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const cancel: ModalProject = { state: false, info: { name: "", id: "" } };
const modal = true;

const target = ref<HTMLElement | null>(null);
onClickOutside(target, () => {
  useAppModalStore().onModalRejectProject(cancel);
});

function onSubmit() {
  // Chamada a API
}
</script>

<template>
  <div v-if="true" class="modal-bg">
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        ref="target"
        class="relative min-w-[40%] max-w-[60%] w-full rounded-lg bg-white text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div
          class="flex items-center p-3 text-xl antialiased font-semibold leading-snug shrink-0"
        >
          Meus Projectos Pendentes
        </div>
        <div class="relative px-3 py-2 border-y">
          <!-- <div class="text-center">
            <p>Sem nenhum projecto pendente!</p>
          </div> -->
          <div class="flex flex-col">
            <div class="flex gap-2">
              <div class="w-24 h-24 bg-neutral-400 rounded-md"></div>
              <div>
                <span>Título do projecto</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-end p-3 shrink-0 text-blue-gray-500"
        >
          <button
            @click="() => {}"
            class="p-3 mr-1 text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
