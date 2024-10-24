<script setup lang="ts">
import { format } from "date-fns";
import { UseImage } from "@vueuse/components";

const { data } = await useFetch(
  `http://localhost:4000/api/users/${useRoute().params.id}`,
  {
    method: "GET",
  }
);

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <div>
      <ui-button-back />
    </div>

    <section class="mt-4 mb-8">
      <h3 class="mb-4">
        Perfil do Utilizador - {{ data.user.firstName }}
        {{ data.user.lastName }}
      </h3>

      <div class="w-full grid grid-cols-12">
        <div class="col-span-3">
          <span
            class="block font-semibold text-base text-neutral-600 uppercase mb-2"
          >
            Informações do Perfil
          </span>
          <div class="mb-2">
            <span class="block leading-snug font-medium">
              Nome do utilizador
            </span>
            <span class="block leading-snug"
              >{{ data.user.firstName }} {{ data.user.lastName }}</span
            >
          </div>
          <div class="mb-2">
            <span class="block leading-snug font-medium"> E-mail </span>
            <span class="block leading-snug">{{ data.user.email }}</span>
          </div>
          <div class="mb-2">
            <span class="block leading-snug font-medium"> Tipo de conta </span>
            <span class="block leading-snug">{{
              capitalizedWord(data.user.accountType)
            }}</span>
          </div>
          <div class="mb-2">
            <span class="block leading-snug font-medium">
              Conta criada em
            </span>
            <span class="block leading-snug">{{
              format(new Date(data.user.createdAt), "P")
            }}</span>
          </div>
          <div>
            <button
              class="px-3 py-2 mr-1 font-sans text-xs font-semibold text-red-500 uppercase transition-all rounded-lg hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Bloquear Perfil
            </button>
          </div>
        </div>
        <div class="col-span-7">
          <span
            class="block font-semibold text-base text-neutral-600 uppercase mb-2"
          >
            Projectos Cadastrados
          </span>

          <div
            v-for="(pj, idx) in data.projects"
            :key="idx"
            class="w-full p-2 flex gap-2.5 !border border-neutral-300 rounded-md transition-all mb-2 hover:bg-neutral-100"
          >
            <div class="w-28 h-28 rounded-md overflow-hidden">
              <UseImage
                :src="`https://ugxrutmbdnievlqtuyng.supabase.co/storage/v1/object/public/uploads/finp2p/${pj.image}`"
                class="w-full h-full object-cover object-center"
              >
                <template #loading>
                  <div class="w-full h-full bg-neutral-200 animate-pulse" />
                </template>
                <template #error>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
                  />
                </template>
              </UseImage>
            </div>
            <div class="flex-1">
              <nuxt-link
                :to="{ path: `/app/projectos/${pj.id}` }"
                class="font-medium text-base !text-neutral-600 hover:!text-brand-primary"
              >
                {{ pj.name }}
              </nuxt-link>

              <div class="my-1">
                <span class=""
                  >Estado:
                  <span
                    class="py-1 px-2 rounded cursor-pointer bg-yellow-50 text-yellow-700"
                    >Pendente</span
                  ></span
                >
              </div>
              <div class="mb-1">
                <span class=""
                  >Cadastrado em:
                  <span class="">{{
                    format(new Date(pj.createdAt), "P")
                  }}</span></span
                >
              </div>
              <div class="">
                <span class=""
                  >Investimentos arrecadados:
                  <span class="font-semibold">{{
                    currencyFormat(pj.amountRequired)
                  }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
