<script setup lang="ts">
const { TESTIMONIALS } = useTestimonial();
</script>

<template>
  <section class="py-16 bg-brand-primary/5">
    <h1 class="text-center mb-8">Depoimentos</h1>
    <Vue3Marquee :duration="40" :pauseOnHover="true">
      <card-depoimento v-for="(t, idx) in TESTIMONIALS" :key="idx" :data="t" />
    </Vue3Marquee>
  </section>
</template>
