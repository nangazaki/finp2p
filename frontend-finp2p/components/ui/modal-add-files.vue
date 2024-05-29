<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";
import type { ILastUpdate } from "@/types/data";

import { verifyLastUpdateDate } from "@/utils/verifyLastUpdateDate";

const lastUpdate = inject("lastUpdate") as ILastUpdate;

const modal = computed(() => useAppModalStore().modalImport);
const target = ref<HTMLElement | null>(null);
onClickOutside(target, (event) => {
  useAppModalStore().onModalImport(false);
});

const loading = ref(false);
const form = ref({
  darktrace: undefined,
  portnox: undefined,
  imperva_waf: undefined,
  imperva_dam: undefined,
  ad_audit: undefined,
  checkpoint_fw_attack: undefined,
  checkpoint_fw: undefined,
  checkpoint_harmony: undefined,
  paloalto: undefined,
});

const disabled = ref(true);
const propertiesToWatch = [
  "darktrace",
  "portnox",
  "imperva_waf",
  "imperva_dam",
  "cloudapp",
  "checkpoint_firewall",
  "checkpoint_harmony",
  "paloalto",
];
// watch(
//   form,
//   (newValue) => {
//     const allPropertiesAreObjects = propertiesToWatch.every(
//       (property) => newValue[property] === "object"
//     );
//     if (allPropertiesAreObjects) {
//       disabled.value = false;
//     }
//   },
//   { deep: true }
// );

const formErrors = ref([]);

const onSubmit = async () => {
  if (formErrors.value.length === 0) {
    loading.value = true;
    const formData = new FormData(Data);

    const { status, error } = await useMyFetch<any>("data", {
      method: "POST",
      contentType: "form-data",
      body: formData,
    });

    loading.value = false;

    if (status.value !== "success") {
      toast.error(error.value?.data.message);
      return;
    }

    toast.success("Dados importados com sucesso!!");
    // setTimeout(() => {
    //   reloadNuxtApp();
    // }, 3500);
  }
};
</script>

<template>
  <div
    v-show="modal"
    class="bg-black/85 w-full h-screen fixed top-0 left-0 z-[999] flex items-center justify-center"
  >
    <transition name="fade">
      <div
        v-show="modal"
        ref="target"
        class="bg-neutral-800 max-w-lg w-full p-6 rounded-xl"
      >
        <div class="text-center">
          <h2 class="text-xl font-bold text-white">Importar Dados</h2>
        </div>
        <hr class="my-3" />
        <div>
          <form id="Data" @submit.prevent="onSubmit">
            <ui-input-import-data
              name="darktrace"
              label-text="DarkTrace"
              @on:input="(e) => (form.darktrace = e)"
            />
            <ui-input-import-data
              name="ad_audit"
              label-text="AD Audit"
              @on:input="(e) => (form.ad_audit = e)"
            />
            <ui-input-import-data
              name="portnox"
              label-text="PortNox"
              @on:input="(e) => (form.portnox = e)"
            />

            <ui-input-import-data
              name="imperva_waf"
              label-text="Imperva WAF"
              @on:input="(e) => (form.imperva_waf = e)"
            />
            <ui-input-import-data
              name="imperva_dam"
              label-text="Imperva DAM"
              @on:input="(e) => (form.imperva_dam = e)"
            />
            <ui-input-import-data
              name="checkpoint_fw_attack"
              label-text="CheckPoint Firewall Attack"
              @on:input="(e) => (form.checkpoint_fw_attack = e)"
            />
            <ui-input-import-data
              name="checkpoint_fw"
              label-text="CheckPoint Firewall"
              @on:input="(e) => (form.checkpoint_fw = e)"
            />
            <ui-input-import-data
              name="checkpoint_harmony"
              label-text="CheckPoint Harmony"
              @on:input="(e) => (form.checkpoint_harmony = e)"
            />

            <ui-input-import-data
              name="paloalto"
              label-text="Palo Alto"
              @on:input="(e) => (form.paloalto = e)"
            />
            <hr class="my-3" />
            <div class="">
              <button
                :disabled="false"
                class="w-full py-2 bg-[#00a1e0] text-white rounded disabled:opacity-70 hover:bg-[#0081b8] disabled:cursor-not-allowed"
              >
                <Icon v-show="loading" name="svg-spinners:ring-resize" />
                <span v-show="!loading"> Concluir importação </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  transform: translate3d(0, 100px, 0);
}

.fade-leave-to {
  transform: translate3d(0, 100px, 0);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
