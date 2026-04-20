import { readLocalizedJson } from "./read-assets";

export async function getActionButtonMap(locale: MonologueLocale) {
    try {
        const json = await readLocalizedJson("actions", locale);
        return new Map<string, ActionButton>(
            Object.entries(json).map(([key, value]) => [
                key,
                { ...(value as object), id: key } as ActionButton,
            ]),
        );
    } catch (e) {
        throw new Error("Failed to load actions JSON", {
            cause: e as Error,
        });
    }
}
