<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAppUserStore } from "@stores/app.user";

const { user, logout } = useAppUserStore();

const isOpen = ref(false);
const modal = ref<HTMLElement | null>(null);

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
    <button
      @click="onOpenModalAvatar"
      class="w-16 xl:w-48 h-[60px] border-l-2 border-white/20 xl:pl-4 flex items-center justify-center gap-3 focus:outline-none"
    >
      <img
        src="../../assets/img/avatar.png"
        class="w-10 h-10 rounded-full cursor-pointer"
        alt="Foto do perfil"
      />
      <div class="hidden flex-1 xl:flex flex-col gap-1 items-start">
        <span class="block text-white font-semibold leading-none"
          >Admin Test</span
        >
        <span class="block text-white/70 leading-none">admin</span>
      </div>
    </button>
    <transition name="fade">
      <div
        ref="modal"
        v-show="isOpen"
        class="absolute z-[999999999] w-40 right-0 xl:left-0 top-16 bg-[#1e1e1e] rounded py-2 topp"
      >
        <ul class="flex flex-col text-white/90 p-0">
          <nuxt-link
            to="#"
            class="text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15"
          >
            <Icon name="heroicons:user" class="text-base" />
            Profile
          </nuxt-link>
          <nuxt-link
            to="#"
            class="text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15"
          >
            <Icon name="heroicons:cog-6-tooth" class="text-base" />
            Settings
          </nuxt-link>
          <nuxt-link
            @click="handleLogoutSession"
            class="cursor-pointer text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15 border-t border-white/15"
          >
            <Icon
              name="heroicons:arrow-left-on-rectangle-20-solid"
              class="text-base"
            />
            Logout
          </nuxt-link>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.topp::before {
  content: "";
  width: 13px;
  height: 13px;
  background: #1e1e1e;
  position: absolute;
  top: -6px;
  right: 16px;
  transform: rotate(45deg);
  border-top: 1px solid #767676;
  border-left: 1px solid #767676;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  transform: translate3d(0, 50px, 0);
}

.fade-leave-to {
  transform: translate3d(0, 50px, 0);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
