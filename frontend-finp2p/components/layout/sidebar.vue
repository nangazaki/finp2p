<script setup lang="ts">
const { sidebarItems, sidebarListUser } = useSidebarList();
const sidebarWrapper = ref<HTMLElement | null>(null);

const menuActive = ref("");

const onToggleSidebar = () => {
  if (process.client) {
    const wrapper = document.querySelector(".wrapper");

    if (wrapper?.classList.contains("toggled")) {
      wrapper?.classList.remove("toggled");
    } else {
      wrapper?.classList.add("toggled");
    }
  }
};

const onMouseEnterSidebar = () => {
  const wrapper = document.querySelector(".wrapper");

  if (wrapper?.classList.contains("toggled")) {
    wrapper?.classList.add("sidebar-hovered");
  }
};

const onMouseLeaveSidebar = () => {
  const wrapper = document.querySelector(".wrapper");

  if (wrapper?.classList.contains("toggled")) {
    wrapper?.classList.remove("sidebar-hovered");
  }
};

const onLogout = () => {};

onMounted(() => {
  const menus = document.querySelectorAll("#nav");
  menus.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      const text = menu.children[1].textContent;

      menuActive.value === text
        ? (menuActive.value = "")
        : (menuActive.value = text);
    });
  });
});

onUnmounted(() => {
  const menus = document.querySelectorAll("#nav");

  menus.forEach((menu) => {
    menu.removeEventListener("click", (event) => {});
  });
});
</script>

<template>
  <div
    ref="sidebarWrapper"
    class="sidebar-wrapper rounded-br-3xl"
    data-simplebar="true"
    @mouseenter="onMouseEnterSidebar"
    @mouseleave="onMouseLeaveSidebar"
  >
    <div class="sidebar-header">
      <nuxt-link to="/">
        <Icon
          name="heroicons:currency-dollar"
          size="30"
          class="logo-icon text-white"
        />
      </nuxt-link>
      <nuxt-link to="/">
        <h4 class="logo-text">FinP2P</h4>
      </nuxt-link>
      <div class="toggle-icon ms-auto" @click="onToggleSidebar">
        <Icon name="bx:bxs-arrow-to-left" />
      </div>
    </div>

    <ul class="metismenu" id="menu">
      <template v-if="useAppUserStore().user?.isAdmin">
        <ui-sidebar-item
          v-for="(item, index) in sidebarItems"
          :key="index"
          :is-title="item.isTitle"
          :name="item.name"
          :link="item.link"
          :icon="item.icon"
          :sub-items="item.subItems"
          :active="menuActive"
          class=""
        />
      </template>
      <template v-else>
        <ui-sidebar-item
          v-for="(item, index) in sidebarListUser"
          :key="index"
          :is-title="item.isTitle"
          :name="item.name"
          :link="item.link"
          :icon="item.icon"
          :sub-items="item.subItems"
          :active="menuActive"
          class=""
        />
      </template>
      <li @click="onLogout">
        <nuxt-link
          @click="
            () => {
              authCookie.deleteToken();
              reloadNuxtApp();
            }
          "
          id="nav"
          class="cursor-pointer"
        >
          <div class="parent-icon">
            <Icon name="heroicons:arrow-right-end-on-rectangle-20-solid" />
          </div>
          <div class="menu-title">Terminar Sessão</div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
