<script setup lang="ts">
import { UseImage } from "@vueuse/components";

interface ITestimonial {
  data: {
    cover: string;
    name: string;
    role: string;
    stars: number;
    text: string;
  };
}

const { data } = defineProps<ITestimonial>();
</script>

<template>
  <div
    class="bg-white relative flex max-w-[28rem] w-full p-4 flex-col rounded-xl !border !shadow-md mr-5"
  >
    <div class="relative flex items-center gap-3 overflow-hidden">
      <UseImage
        :src="data.cover"
        class="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
      >
        <template #loading>
          <div class="w-12 h-12 rounded-full bg-neutral-200 animate-pulse" />
        </template>
      </UseImage>
      <div class="flex-1 flex flex-col gap-0.5">
        <div class="flex items-center justify-between">
          <h5
            class="block antialiased font-medium leading-tight tracking-normal"
          >
            {{ data.name }}
          </h5>
          <div class="flex items-center gap-0">
            <Icon
              name="heroicons:star-solid"
              v-for="idx in 5"
              :key="idx"
              size="16"
              class="text-neutral-400"
              :class="{ '!text-yellow-700': data.stars >= idx }"
            />
          </div>
        </div>
        <p class="antialiased font-light leading-relaxed text-blue-gray-900">
          {{ data.role }}
        </p>
      </div>
    </div>
    <div class="mt-4">
      <p class="antialiased font-light leading-relaxed text-inherit">
        {{ data.text }}
      </p>
    </div>
  </div>
</template>
