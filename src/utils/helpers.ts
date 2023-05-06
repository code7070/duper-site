import CookieJS from "js-cookie";

export const isArrayLen = (arr = []) =>
  typeof arr === "object" && arr?.length > 0;

export const slugify = (str = "") =>
  `${str}`
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export const getCookie = (name = "") => CookieJS.get(name);

type CookieOptions = {
  expires?: number;
  [key: string]: any;
};

export const setCookie = (name = "", value = "", options?: CookieOptions) =>
  CookieJS.set(name, value, { ...options });

export const removeCookie = (name: string) => {
  const cookiename = name;
  const havingspace = cookiename.includes(" ");
  const haveSepComma = cookiename.includes(", ");

  const doRemove = (isname: string) => CookieJS.remove(isname);

  if (haveSepComma) return cookiename.split(", ").map((item) => doRemove(item));
  else if (havingspace)
    return cookiename.split(" ").map((item) => doRemove(item));
  return doRemove(cookiename);
};

export const dologout = async () => {
  const res = await fetchAPI.get("logout");
  if (res.status === 200) {
    removeCookie("username, userid, token");
    setTimeout(() => {
      window.location.href = "/login";
    }, 150);
  }
};

export function randomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const urlSplitbee = "https://notion-api.splitbee.io/v1/page/";

export const fetchAPI = {
  get: async (endpoint: string, body = {}, fromStatic = false) => {
    const params = new URLSearchParams(body).toString();
    const baseUrl = fromStatic ? process.env.NEXT_PUBLIC_currentUrl : "";
    return (
      await fetch(`${baseUrl}/api/${endpoint}?${params}`, { method: "GET" })
    ).json();
  },
  post: async (endpoint: string, body = {}, fromStatic = false) => {
    const newBody = JSON.stringify(body);
    const baseUrl = fromStatic ? process.env.NEXT_PUBLIC_currentUrl : "";
    return (
      await fetch(`${baseUrl}/api/${endpoint}`, {
        method: "POST",
        body: newBody,
      })
    ).json();
  },
};

export const swrFetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchSplitbee = async (pageId: string) =>
  await fetch(`${urlSplitbee}/${pageId}`).then((res) => res.json());

export const slugify2 = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const undashit = (str: string) => str.replaceAll("-", "");
