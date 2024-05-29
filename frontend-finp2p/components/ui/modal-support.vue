<script setup lang="ts">
const modal = computed(() => useAppModalStore().modalSupport);
</script>

<template>
  <div
    v-show="modal"
    class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/85"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="relative bg-neutral-800 max-w-lg w-full p-6 rounded">
        <div class="flex justify-between items-center">
          <h3>Suporte</h3>
          <button
            @click="useAppModalStore().onModalSupport(false)"
            class="w-8 h-8 border rounded-md leading-none hover:bg-neutral-700"
          >
            <Icon name="bx:x" size="20" />
          </button>
        </div>
        <hr class="my-3" />
        <div>
          <p class="mb-3">
            Abaixo estão listadas as formas de entrar em contacto com o suporte
            técnico:
          </p>
          <ul>
            <li class="flex items-center gap-3 mb-1">
              <Icon name="bx:support" size="20" /> 949 227 949
            </li>
            <li class="flex items-center gap-3">
              <Icon name="bx:mail-send" size="20" /> geral@hanzolo.co.ao
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
