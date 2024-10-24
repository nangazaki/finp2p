import type { FetchError } from "ofetch";
import type { _AsyncData } from "~/types/asyncData";

export async function useMyFetch<T>(
  endpoint: string,
  options: IOptions
): Promise<_AsyncData<T, FetchError>> {
  const { headers, method, body, contentType } = options;

  const token = authCookie.getToken();
  const baseURL = "http://localhost:4000/api";

  const header = new Headers({
    ...headers,
    "x-apikey": "",
    // authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  });

  let requestBody: any;

  if (contentType === "json" && body) {
    header.append("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  } else if (contentType === "form-data" && body) {
    requestBody = body;
  }

  const { data, error, status, execute, pending, refresh } = await useFetch<T>(
    `${baseURL}/${endpoint}`,
    {
      method,
      headers: header,
      body: requestBody,
    }
  );

  return { data, status, error, execute, pending, refresh };
}

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type DataType = "json" | "form-data";

interface IOptions {
  method: HttpMethods;
  body?: object;
  contentType?: DataType;
  headers?: object;
}
