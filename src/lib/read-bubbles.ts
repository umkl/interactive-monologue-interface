import { readLocalizedJson } from "./read-assets";

export async function getChatBubbleMap(locale: MonologueLocale) {
    try {
        const json = await readLocalizedJson("bubbles", locale);
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
