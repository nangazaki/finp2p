<script setup lang="ts">
const { data } = await useFetch("https://finp2p.onrender.com/api/project/data", {
  method: "GET",
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="page-content">
    <div class="text-white row row-cols-1 row-cols-md-2 row-cols-xl-4">
      <div class="col">
        <div class="card min-h-32 radius-10 bg-gradient bg-sky-600">
          <div class="card-body">
            <div class="flex items-center text-white">
              <div>
                <p class="mb-2 leading-tight text-base h-10">
                  Projectos Criados
                </p>
                <h4 class="my-1 text-white">{{ data.total }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card min-h-32 radius-10 bg-gradient bg-green-600">
          <div class="card-body">
            <div class="flex items-center text-white">
              <div>
                <p class="mb-2 leading-tight text-base h-10">
                  Projectos Aprovados
                </p>
                <h4 class="my-1 text-white">{{ data.approveds }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card min-h-32 radius-10 bg-gradient bg-red-600">
          <div class="card-body">
            <div class="flex items-center text-white">
              <div>
                <p class="mb-2 leading-tight text-base h-10">
                  Projectos Rejeitados
                </p>
                <h4 class="my-1 text-white">{{ data.rejeitecds }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card min-h-32 radius-10 bg-gradient bg-yellow-600">
          <div class="card-body">
            <div class="flex items-center text-white">
              <div>
                <p class="mb-2 leading-tight text-base h-10">
                  Entidades mo Sistema
                </p>
                <h4 class="my-1 text-white">{{ data.entities }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-white row row-cols-1 row-cols-md-2 row-cols-xl-2">
      <div class="col">
        <div class="card min-h-32 radius-10 bg-transparent">
          <div class="card-body">
            <ClientOnly>
              <ui-donut
                :impacts="{
                  approved: data.approveds,
                  pendent: data.rejeitecds,
                }"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
