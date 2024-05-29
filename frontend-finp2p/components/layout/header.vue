<script setup lang="ts">
const scroll = computed(() => useAppHeaderStore().isScrolledDown);

const username = computed(() => {})

const searchBar = ref<HTMLElement | null>(null);
const mobileToggleMenu = ref<HTMLElement | null>(null);
const mobileSearchIcon = ref<HTMLElement | null>(null);
const iconCloseSearchFullBar = ref<HTMLElement | null>(null);

onMounted(() => {
  mobileToggleMenu.value?.addEventListener("click", () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper?.classList.add("toggled");
  });

  mobileSearchIcon.value?.addEventListener("click", () => {
    searchBar.value?.classList.add("full-search-bar");
  });

  iconCloseSearchFullBar.value?.addEventListener("click", () => {
    searchBar.value?.classList.remove("full-search-bar");
  });
});

onUnmounted(() => {
  mobileToggleMenu.value?.removeEventListener("click", () => {});
  mobileSearchIcon.value?.removeEventListener("click", () => {});
  iconCloseSearchFullBar.value?.removeEventListener("click", () => {});
});
</script>

<template>
  <header class="">
    <div
      class="topbar flex items-center !bg-brand-primary-darker"
      :class="{ 'bg-dark': scroll }"
    >
      <nav class="navbar navbar-expand">
        <div>
          <p class="text-white">
            Olá, <strong>{{ useAppUserStore().user?.firstName }} {{ useAppUserStore().user?.lastName }}</strong
            >!
          </p>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
