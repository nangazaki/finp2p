export const useAppHeaderStore = defineStore("header", () => {
  const isScrolledDown = ref<boolean>(false);

  const onScroll = (value) => {
    isScrolledDown.value = value;
  };

  return {
    isScrolledDown,
    onScroll,
  };
});
