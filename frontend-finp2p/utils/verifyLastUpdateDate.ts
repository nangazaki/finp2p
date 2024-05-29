export function verifyLastUpdateDate(OldDate: string | null) {
  if (typeof OldDate === "string") {
    const newDate = new Date().getTime();
    const oldDate = new Date(OldDate).getTime();

    const difference = newDate - oldDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return days >= 7;
  } else {
    return true;
  }
}
