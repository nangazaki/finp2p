import { useScroll } from "@vueuse/core";
import { useAppHeaderStore } from "@stores/app.header";

export function useMyScroll(el: HTMLElement) {
  const section = ref<HTMLElement>(el);

  const { arrivedState } = useScroll(section);

  if (!arrivedState.top) {
    useAppHeaderStore().onScroll(true);
  } else {
    useAppHeaderStore().onScroll(false);
  }
}
