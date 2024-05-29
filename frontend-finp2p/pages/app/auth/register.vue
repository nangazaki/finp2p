<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <section>
    <div class="grid grid-cols-12 bg-brand-primary/5">
      <div
        class="other-login col-span-12 md:col-span-6 h-screen flex justify-center items-center p-6"
      >
        <div class="max-w-lg w-full p-4 bg-white !border rounded-2xl">
          <h1 class="!text-brand-primary text-center mb-4">FinP2P</h1>

          <div class="min-h-[26rem]">
            <h4 class="text-center font-medium mb-2">Criar conta</h4>

            <form-create-user />
          </div>
        </div>
      </div>
      <div class="hidden md:block md:col-span-6 h-screen login"></div>
    </div>
  </section>
</template>

<style scoped>
.login {
  background-color: #f9f9f9;
}
</style>
