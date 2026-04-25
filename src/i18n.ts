import { getRequestConfig } from "next-intl/server";
import { routing } from "./i18n/routing";
import { readFile } from "fs/promises";
import path from "path";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messagesPath = path.join(
    process.cwd(),
    "messages",
    `${locale}.json`
  );
  const messages = JSON.parse(await readFile(messagesPath, "utf-8"));

  return {
    locale,
    messages,
  };
});
