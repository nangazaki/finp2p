<script setup lang="ts">
const user = computed(() => useAppUserStore().user);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 6) {
      useAppHeaderStore().onScroll(true);
    } else {
      useAppHeaderStore().onScroll(false);
    }
  });
});

onUnmounted(() => window.removeEventListener("scroll", () => {}));
</script>

<template>
  <div class="wrapper">
    <layout-sidebar />

    <layout-header />

    <div ref="main" class="page-wrapper h-[150vh]">
      <slot />

      <layout-footer />
    </div>

    <div
      v-if="!user?.accountVerify"
      class="w-screen h-screen fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-lg"
    >
      <div class="w-screen h-screen flex items-end p-6">
        <div ref="target" class="bg-white w-[80%] mx-auto p-4 rounded-xl">
          <p class="text-lg font-medium">Notificação de Conta Pendente</p>

          <hr class="my-2" />

          <p>
            Você está vendo esta notificação porque
            <b>sua conta ainda não foi ativada</b>.
          </p>
          <p class="mb-2">
            Por favor, aguarde até 24 horas para a ativação. Se precisar de
            assistência imediata, entre em contato com o nosso suporte técnico
            pelo e-mail: <b>suporte@finp2p.ao</b>.
          </p>
          <p>Obrigado pela sua paciência!</p>
        </div>
      </div>
    </div>
  </div>
</template>
