import { handleHttpError, isError } from "./errorhandle";
export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
const domain = process.env.TWITTER_EUNDOL_DOMAIN
  ? ensureStartsWith(process.env.TWITTER_EUNDOL_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${process.env.TWITTER_EUNDOL_DOMAIN}`;
const key = process.env.TWITTER_EUNDOLFRONT_ACCESS_TOKEN!;
type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function TwitterFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{
  status: number;
  body: T | { message: string };
}> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Eundol-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    if (!result.ok) {
      return handleHttpError(result);
    }

    const body = await result.json();

    // if (body.errors) {
    //   throw body.errors[0];
    // }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}
