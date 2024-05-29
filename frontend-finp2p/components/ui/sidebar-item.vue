<script setup lang="ts">
import type { SidebarItem } from "@types/sidebar.ts";

const { name, icon, isTitle, link, subItems, active } =
  defineProps<SidebarItem>();
</script>

<template>
  <template v-if="isTitle">
    <li class="menu-label">{{ name }}</li>
  </template>

  <template v-else>
    <li :class="{ 'mm-active': active === name }">
      <nuxt-link
        :to="link"
        :id="`${subItems.length > 0 ? 'nav' : ''}`"
        :aria-expanded="`${name === active ? true : false}`"
        :class="`${subItems.length > 0 ? 'has-arrow' : ''}`"
      >
        <div class="parent-icon">
          <Icon :name="icon" />
        </div>
        <div class="menu-title">{{ name }}</div>
      </nuxt-link>

      <ul class="mm-collapse" :class="{ 'mm-show': active === name }">
        <li v-for="item in subItems" :key="item.name">
          <nuxt-link :to="item.link" class="flex items-center gap-2">
            <Icon :name="item.icon" />
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </li>
  </template>
</template>
