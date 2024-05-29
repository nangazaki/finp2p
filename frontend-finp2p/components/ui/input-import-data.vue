<script setup lang="ts">
interface IInputProps {
  name: string;
  labelText: string;
}

const { name, labelText } = defineProps<IInputProps>();

const emit = defineEmits(["on:input"]);

const inputFile = ref<HTMLInputElement | null>(null);
const file = ref<File | undefined>(undefined);
const fileName = ref("");

const onClickButton = () => {
  if (!fileName.value) {
    inputFile.value?.click();
    return;
  }

  fileName.value = "";
  file.value = undefined;
  emit("on:input", undefined);
};

onMounted(() => {
  inputFile.value?.addEventListener("change", (e: Event) => {
    const fileBefore = e.target.files[0];

    fileName.value = fileBefore.name;
    file.value = fileBefore;

    emit("on:input", file.value);
  });
});
</script>

<template>
  <div class="p-2 flex flex-col">
    <div class="w-full flex items-center justify-between">
      <label :for="name" class="text-base font-medium"> {{ labelText }} </label>
      <span class="relative">
        <button
          @click.prevent="onClickButton"
          class="p-1 px-2 flex items-center gap-1"
          :class="{ 'text-red-600': fileName }"
        >
          <Icon
            name="heroicons:plus"
            size="20"
            class="transition-all"
            :class="{ 'rotate-45': fileName }"
          />
          {{ !fileName ? "Adicionar" : "Remover" }}
        </button>
        <input
          :name="name"
          ref="inputFile"
          type="file"
          accept=".csv, .txt"
          class="absolute top-0 left-0 z-10 invisible"
        />
      </span>
    </div>
    <div class="text-neutral-400">
      {{ fileName.length > 0 ? fileName : "Nenhum fucheiro selecionado!" }}
    </div>
  </div>
</template>
