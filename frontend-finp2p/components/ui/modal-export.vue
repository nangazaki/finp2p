<script setup lang="ts">
const modal = computed(() => useAppModalStore().modalSupport);

const form = ref({});
</script>

<template>
  <div
    v-show="false"
    class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/85"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="relative bg-neutral-800 max-w-lg w-full p-6 rounded">
        <div class="flex justify-between items-center">
          <h3>Exportar Dados</h3>
          <button
            @click="useAppModalStore().onModalSupport(false)"
            class="w-8 h-8 border rounded-md leading-none hover:bg-neutral-700"
          >
            <Icon name="bx:x" size="20" />
          </button>
        </div>
        <hr class="my-3" />
        <div>
          <p>Escolha a periodicidade que necessitas</p>
          
        </div>
      </div>
    </div>
  </div>
</template>
