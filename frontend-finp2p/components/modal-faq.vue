<script setup lang="ts">
const show = ref(1);
const state = computed(() => useAppModalStore().modalFaq);
</script>

<template>
  <div
    v-if="state"
    class="w-screen h-screen fixed z-50 top-0 left-0 bg-black/5 backdrop-blur"
  >
    <div class="w-screen h-screen flex justify-center items-center p-5">
      <div
        class="relative max-w-3xl w-full min-h-[35rem] max-h-[35rem] overflow-y-auto p-4 bg-white !rounded-3xl shadow-sm !border"
      >
        <div>
          <h4 class="font-medium text-center mb-6">
            F.A.Q (Perguntas Frequentes)
          </h4>
          <button
            @click="useAppModalStore().onModalFaq(false)"
            class="absolute top-5 right-5 leading-none p-1 rounded-md border !border-neutral-300 hover:bg-neutral-200"
          >
            <Icon name="heroicons:x-mark-16-solid" size="20" />
          </button>
        </div>
        <div class="flex gap-3">
          <div
            @click="() => (show = 1)"
            :class="{ 'bg-brand-primary text-white': show === 1 }"
            class="flex-1 text-center text-lg p-2 border !border-brand-primary rounded-full mb-3 cursor-pointer"
          >
            Tomador
          </div>
          <div
            @click="() => (show = 2)"
            :class="{ 'bg-brand-primary text-white': show === 2 }"
            class="flex-1 text-center text-lg p-2 border !border-brand-primary rounded-full mb-3 cursor-pointer"
          >
            Investidor
          </div>
        </div>

        <div v-show="show === 1">
          <ui-acordion
            v-for="(faq, index) in FAQs"
            :key="index"
            :title="faq.title"
            :active="faq.active"
            :id="`faqs-${index}`"
          >
            {{ faq.text }}
          </ui-acordion>
        </div>

        <div v-show="show === 2">
          <ui-acordion
            v-for="(faq, index) in FAQsI"
            :key="index"
            :title="faq.title"
            :active="faq.active"
            :id="`faqs-${index}`"
          >
            {{ faq.text }}
          </ui-acordion>
        </div>
      </div>
    </div>
  </div>
</template>
