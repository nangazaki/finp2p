<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAppUserStore } from "@stores/app.user";

const { user, logout } = useAppUserStore();

const isOpen = ref(false);
const modal = ref<HTMLElement | null>(null);
const styleModal = ref("");

onClickOutside(modal, () => {
  isOpen.value = false;
});

async function handleLogoutSession() {
  logout();
  navigateTo("/auth/login");
}

const onOpenModalAvatar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="relative">
    <button @click="onOpenModalAvatar" class="p-2 text-white">
      <Icon name="heroicons:chat-bubble-bottom-center" size="24" />
    </button>
    <transition name="fade">
      <div
        ref="modal"
        class="absolute z-[999999999] w-56 h-44 right-0 top-14 bg-[#1E1E1E] rounded py-2"
        v-show="isOpen"
      >
        <ul class="flex flex-col text-white/90"></ul>
      </div>
    </transition>
  </div>
</template>
