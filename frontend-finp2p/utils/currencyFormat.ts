export function currencyFormat(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "AOA",
  }).format(value);
}
