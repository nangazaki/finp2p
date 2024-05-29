import { pt, ptBR } from "date-fns/locale";
import { parse, formatDistanceToNow } from "date-fns";

export function distanceToNow(d: string) {
  const date = parse(d, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date());
  const formattedDistance = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });

  return formattedDistance;
}
