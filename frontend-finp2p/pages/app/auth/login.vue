<script setup lang="ts">
import { toast } from "vue3-toastify";
import type { User } from "~/types/user";

definePageMeta({
  layout: false,
});

const hiddenPassword = ref(true);

const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const onSubmit = async () => {
  loading.value = true;
  const { data, status, error } = await useFetch<{
    userInfo: User;
    token: string;
  }>("https://finp2p.onrender.com/api/auth/login", {
    method: "POST",
    body: {
      ...form.value,
    },
  });
  loading.value = false;

  if (status.value === "success") {
    toast.success("Seja bem-vindo de volta!");

    authCookie.setToken(data.value?.token);

    useAppUserStore().storeUser({
      id: data.value?.userInfo.id,
      email: data.value?.userInfo.email,
      accountType: data.value?.userInfo.accountType,
      createdAt: data.value?.userInfo.createdAt,
      entity: data.value?.userInfo.entity,
      firstName: data.value?.userInfo.firstName,
      lastName: data.value?.userInfo.lastName,
      isAdmin: data.value?.userInfo.isAdmin,
      password: data.value?.userInfo.password,
      updatedAt: data.value?.userInfo.updatedAt,
    });

    setTimeout(() => {
      data.value?.userInfo.isAdmin
        ? navigateTo("/app")
        : navigateTo("/app/home");
    }, 3000);

    return;
  }

  toast.error("Verifique as creedencias!", {
    theme: "colored",
  });
};
</script>

<template>
  <section>
    <div class="grid grid-cols-12 bg-brand-primary/5">
      <div class="hidden md:block md:col-span-6 h-screen login"></div>
      <div
        class="other-login col-span-12 md:col-span-6 h-screen flex justify-center items-center p-6"
      >
        <div class="max-w-md w-full p-4 bg-white !border rounded-2xl">
          <h1 class="!text-brand-primary text-center mb-4">FinP2P</h1>

          <div class="">
            <h4 class="text-center font-medium mb-2">Acesso Restrito</h4>
            <form @submit.prevent="onSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="text-base !text-neutral-500 font-medium block"
                >
                  E-mail
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  placeholder="Endereço de e-mail"
                  class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
                />
              </div>
              <div class="mb-4">
                <label
                  for="password"
                  class="text-base !text-neutral-500 font-medium block"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                  placeholder="**********"
                  class="w-full p-2 bg-transparent border !border-neutral-400 focus:outline-brand-primary placeholder:!text-neutral-800 rounded-lg"
                />
              </div>

              <div class="flex">
                <button
                  type="submit"
                  class="flex-1 flex items-center justify-center gap-2 leading-none py-2.5 border-2 border-brand-primary bg-brand-primary text-lg text-white rounded-md hover:bg-brand-primary-darker focus:outline-none"
                >
                  <Icon v-show="!loading" name="heroicons:lock-closed" />
                  <Icon v-show="loading" name="svg-spinners:ring-resize" />
                  Enviar
                </button>
              </div>
              <div class="mt-3 text-center">
                <p>
                  Não possuí uma conta?
                  <nuxt-link
                    to="/app/auth/register"
                    class="font-medium hover:text-brand-primary"
                  >
                    Criar conta
                  </nuxt-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login {
  background-color: #f9f9f9;
}
</style>
