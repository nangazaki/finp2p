<script setup lang="ts">
import { UseImage } from "@vueuse/components";

const { name, cover, id } = defineProps<{
  name: string;
  cover: string;
  id: string;
}>();
</script>

<template>
  <div
    class="col-span-4 bg-white shadow-md border-2 hover:!border-brand-primary/30 rounded-lg w-full"
  >
    <div class="">
      <nuxt-link :to="`/projectos/${id}`">
        <UseImage
          class="rounded-t-lg h-52 w-full object-cover object-center"
          :src="`https://ugxrutmbdnievlqtuyng.supabase.co/storage/v1/object/public/uploads/finp2p/${cover}`"
          alt=""
        >
          <template #loading>
            <div class="rounded-tlg h-52 w-full bg-neutral-200 animate-pulse" />
          </template>
          <template #error>
            <img
              src="https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
              class="rounded-tlg h-52 w-full object-center object-contain"
            />
          </template>
        </UseImage>
      </nuxt-link>
      <div class="p-4">
        <a href="#">
          <h5
            class="!text-gray-800 font-medium text-xl tracking-tight mb-2 dark:text-white"
          >
            {{ name }}
          </h5>
        </a>

        <nuxt-link
          :to="`/projectos/${id}`"
          class="text-white bg-brand-primary hover:bg-brand-primary-darker focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
        >
          Saiba mais
          <Icon name="heroicons:arrow-small-right" size="20" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
