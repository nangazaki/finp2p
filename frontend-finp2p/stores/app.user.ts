import { defineStore } from "pinia";
import type { User } from "~/types/user";

export const useAppUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const storeUser = (data: User) => {
    user.value = data;
  };

  const logout = () => {
    user.value = null;
    authCookie.deleteToken();
  };

  return {
    user,
    storeUser,
    logout,
  };
});
