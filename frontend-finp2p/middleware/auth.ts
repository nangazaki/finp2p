import type { UserLogged } from "~/types/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { storeUser, user } = useAppUserStore();
  const token = authCookie.getToken();

  if (token) {
    const { data, status } = await useFetch<UserLogged>(
      "http://localhost:4000/api/auth/user-logged",
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );

    if (status.value !== "success") {
      authCookie.deleteToken();

      return navigateTo("/app/auth/login", { replace: true });
    }

    storeUser({
      id: data.value?.id,
      email: data.value?.email,
      accountType: data.value?.accountType,
      createdAt: data.value?.createdAt,
      entity: null,
      firstName: data.value?.firstName,
      lastName: data.value?.lastName,
      isAdmin: data.value?.isAdmin,
      password: data.value?.password,
      updatedAt: data.value?.updatedAt,
      accountVerify: data.value?.accountVerify,
    });
  } else {
    authCookie.deleteToken();

    return navigateTo("/app/auth/login", { replace: true });
  }

  return;
});
