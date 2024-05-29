<script setup lang="ts">
import { format } from "date-fns";
import { UseImage } from "@vueuse/components";
const { data: Projects } = await useFetch("http://localhost:4000/api/project");

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="page-content min-h-[80vh] !px-10">
    <section class="mb-8">
      <div class="mb-4 max-w-sm">
        <h3 class="mb-2">Projectos Disponíveis</h3>
        <p>
          Conheça os projectos disponíveis para obter investimentos na nossa
          plataforma!
        </p>
      </div>

      <div class="w-full grid grid-cols-12">
        <div class="col-span-12">
          <template v-if="Projects.length > 0">
            <div
              v-for="(project, idx) in Projects"
              :key="idx"
              class="w-full p-2 flex gap-2.5 !border border-neutral-300 rounded-md transition-all mb-2 hover:bg-neutral-100"
            >
              <div class="w-28 h-28 rounded-md overflow-hidden">
                <UseImage
                  :src="`https://ugxrutmbdnievlqtuyng.supabase.co/storage/v1/object/public/uploads/finp2p/${project.image}`"
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
                  :to="{ path: `/app/projectos/${project.id}` }"
                  class="font-medium text-base !text-neutral-800 hover:!text-brand-primary"
                >
                  {{ project.name }}
                </nuxt-link>

                <div class="my-1">
                  <span class=""
                    >Cadastrado em:
                    <span class="">{{ format(new Date(project.createdAt), 'Pp') }}</span></span
                  >
                </div>
                <div class="mb-1">
                  <span class=""
                    >Investimento necessário:
                    <span class="font-semibold">{{
                      currencyFormat(project.amountRequired)
                    }}</span></span
                  >
                </div>

                <div>
                  <nuxt-link
                    :to="{ path: `/app/projectos/${project.id}` }"
                    class="antialiased font-medium hover:text-brand-primary flex items-center gap-1"
                  >
                    <Icon name="heroicons:arrow-right-16-solid" />
                    Saiba mais
                  </nuxt-link>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="w-full text-center p-3 !border border-neutral-300 rounded-md transition-all mb-2 hover:bg-neutral-100"
            >
              <p>Não há projectos disponíveis no momento!</p>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
