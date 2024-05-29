<template>
  <button
    @click="useRouter().go(-1)"
    class="flex items-center gap-2 hover:text-brand-primary"
  >
    <Icon name="heroicons:arrow-left-20-solid" size="18" />
    Voltar
  </button>
</template>
