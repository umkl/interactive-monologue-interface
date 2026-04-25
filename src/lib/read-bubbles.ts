import { readFile } from "fs/promises";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "data");
const DEFAULT_LOCALE: MonologueLocale = "en";

async function readBubbleJson(locale: MonologueLocale) {
    const preferredPath = path.join(DATA_ROOT, locale, "bubbles.json");

    try {
        return JSON.parse(await readFile(preferredPath, "utf8"));
    } catch (error) {
        if (locale === DEFAULT_LOCALE) {
            throw error;
        }

        const fallbackPath = path.join(DATA_ROOT, DEFAULT_LOCALE, "bubbles.json");
        return JSON.parse(await readFile(fallbackPath, "utf8"));
    }
}

export async function getChatBubbleMap(locale: MonologueLocale) {
    try {
        const json = await readBubbleJson(locale);
        return new Map<string, ChatBubble>(
            Object.entries(json).map(([key, value]) => [
                key,
                { ...(value as object), id: key } as ChatBubble,
            ]),
        );
    } catch (e) {
        throw new Error("Failed to load bubbles JSON", {
            cause: e as Error,
        });
    }
}
