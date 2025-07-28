import Cookies from "universal-cookie";
import type { CookieSetOptions, CookieChangeOptions, CookieGetOptions } from "universal-cookie"
import { onMounted, onUnmounted, readonly, ref, type Ref } from "vue";

export function useCookies<T extends Record<string, any> = Record<string, any>>(options?: UseCookiesOptions): UseCookiesReturn<T> {
  const data = ref<Record<string, any>>({});

  function onCookieChange(cookie: CookieChangeOptions) {
    data.value[cookie.name] = cookie.value;
  }

  let cookies: Cookies | undefined;

  // if (import.meta.server) {
  //   const cookieHeader = useRequestHeader("cookie");
  //   cookies = new Cookies(cookieHeader);
  // }

  // if (import.meta.client) {
  if (true) {
    const localCookies = new Cookies();

    onMounted(() => {
      localCookies.addChangeListener(onCookieChange);
    })

    onUnmounted(() => {
      localCookies.removeChangeListener(onCookieChange);
    });

    cookies = localCookies
  }

  const immediate = options?.immediate ?? true;
  if (!!cookies && immediate) {
    data.value = cookies.getAll();
  }

  return {
    // @ts-expect-error
    data: readonly(data),
    get<K extends (keyof T) & string>(name: K, options?: CookieGetOptions) {
      return cookies?.get(name, options);
    },
    set<K extends (keyof T) & string>(name: K, value: T[K], options?: CookieSetOptions) {
      cookies?.set(name, value, options);
    },
    remove<K extends (keyof T) & string>(name: K) {
      cookies?.remove(name);
    }
  };
}

export type UseCookiesOptions = {
  immediate?: boolean
}

export type UseCookiesReturn<T extends Record<string, any>> = {
  data: Readonly<Ref<T>>
  get<K extends (keyof T) & string>(name: K, options?: CookieGetOptions): T[K] | undefined
  set<K extends (keyof T) & string>(name: K, value: T[K], options?: CookieSetOptions): void
  remove<K extends (keyof T) & string>(name: K): void
}
