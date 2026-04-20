import { readFile, stat } from "fs/promises";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const DEFAULT_LOCALE: MonologueLocale = "en";

export async function resolvePublicAssetPath(fileName: string) {
    const assetPath = path.normalize(path.join(PUBLIC_ROOT, fileName));
    if (!assetPath.startsWith(`${PUBLIC_ROOT}${path.sep}`)) {
        throw new Error(`Invalid public asset path: ${fileName}`);
    }
    return assetPath;
}

export async function readPublicJson(fileName: string) {
    return JSON.parse(
        await readFile(await resolvePublicAssetPath(fileName), "utf8"),
    );
}

export async function publicAssetExists(fileName: string) {
    try {
        const fileStat = await stat(await resolvePublicAssetPath(fileName));
        return fileStat.isFile();
    } catch {
        return false;
    }
}

export async function readLocalizedJson(
    fileBase: string,
    locale: MonologueLocale,
) {
    const preferred = `${fileBase}.${locale}.json`;
    if (locale === DEFAULT_LOCALE || (await publicAssetExists(preferred))) {
        return readPublicJson(preferred);
    }

    return readPublicJson(`${fileBase}.${DEFAULT_LOCALE}.json`);
}
