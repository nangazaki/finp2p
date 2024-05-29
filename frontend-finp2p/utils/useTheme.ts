const COOKIE = "_theme";

export default {
  setTheme(theme: string): void {
    useCookie(COOKIE).value = theme;
  },

  getTheme(): string | null | undefined {
    return useCookie(COOKIE).value;
  },
};