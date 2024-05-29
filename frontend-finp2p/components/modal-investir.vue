<script setup lang="ts"></script>

<template>
  <div v-if="false" class="w-screen h-screen fixed top-0 left-0 bg-black/5 backdrop-blur">
    <div class="w-screen h-screen flex justify-center items-center">
      <div
        class="max-w-md w-full min-h-[30rem] p-4 bg-white !rounded-3xl shadow-sm !border"
      >
        <h4 class="font-medium text-center mb-6">
          Investir no Projecto - {Nome do Projecto}
        </h4>

        <form>
          <div class="mb-3">
            <label
              for="name"
              class="text-base !text-neutral-500 font-medium block"
              >Nome completo</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary rounded-lg"
            />
          </div>
          <div class="mb-3">
            <label
              for="email"
              class="text-base !text-neutral-500 font-medium block"
              >E-mail</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary rounded-lg"
            />
          </div>
          <div class="mb-3">
            <label
              for="bi"
              class="text-base !text-neutral-500 font-medium block"
              >Nº do Bilhete de Identificação</label
            >
            <input
              type="text"
              name="bi"
              id="bi"
              class="w-full p-2 border !border-neutral-400 focus:outline-brand-primary rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
