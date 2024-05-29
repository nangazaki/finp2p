<script setup lang="ts">
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
  </div>
</template>
