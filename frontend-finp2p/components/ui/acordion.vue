<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string,
  title: string,
  active:  boolean,
}>(), {
  active: false,
});

const accordionOpen = ref(props.active);

const toggleAccordion = () => {
 accordionOpen.value = !accordionOpen.value;
};
</script>

<template>
  <div class="py-1">
    <p>
      <button
        class="flex items-center justify-between w-full text-left font-semibold py-2 focus:outline-none"
        @click.prevent="toggleAccordion"
        :aria-expanded="accordionOpen"
        :aria-controls="`accordion-text-${id}`"
      >
        <span>{{ title }}</span>
        <svg
          class="fill-PRIMARY shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            :class="`transform origin-center transition duration-200 ease-out ${
              accordionOpen ? 'rotate-180' : ''
            }`"
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            :class="`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen ? 'hidden' : ''
            }`"
          />
        </svg>
      </button>
    </p>
    <div
      :id="`accordion-text-${id}`"
      role="region"
      :aria-labelledby="`accordion-title-${id}`"
      class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
      :class="
        accordionOpen
          ? 'grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0'
      "
    >
      <div class="overflow-hidden">
        <p class="pb-3">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>
