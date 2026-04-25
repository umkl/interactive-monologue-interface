import { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "data");
const DEFAULT_LOCALE: MonologueLocale = "en";

async function readMetadataFile(locale: MonologueLocale) {
    const filePath = path.join(DATA_ROOT, locale, "meta.json");
    const raw = await readFile(filePath, "utf8");

    if (!raw.trim()) {
        return {};
    }

    return JSON.parse(raw);
}

export async function getMetadata(locale: MonologueLocale = DEFAULT_LOCALE) {
    try {
        return await readMetadataFile(locale);
    } catch (e) {
        if (locale !== DEFAULT_LOCALE) {
            try {
                return await readMetadataFile(DEFAULT_LOCALE);
            } catch (fallbackError) {
                throw new Error("Failed to load metadata JSON", {
                    cause: fallbackError as Error,
                });
            }
        }

        throw new Error("Failed to load metadata JSON", { cause: e as Error });
    }
}

export async function generateMonologueMetadata({
    params,
}: {
    params?: Promise<{ locale?: MonologueLocale }>;
} = {}): Promise<Metadata> {
    const resolvedParams = await params;
    const locale = resolvedParams?.locale ?? DEFAULT_LOCALE;

    return {
        ...(await getMetadata(locale)),
        icons: {
            icon: [
                {
                    url: "/favicon.svg",
                    type: "image/svg+xml",
                },
                {
                    url: "/favicon-128.ico",
                    sizes: "128x128",
                    type: "image/x-icon",
                },
                {
                    url: "/favicon-128-dark.ico",
                    sizes: "128x128",
                    type: "image/x-icon",
                    media: "(prefers-color-scheme: dark)",
                },
            ],
            shortcut: ["/favicon-128.ico"],
            apple: [
                {
                    url: "/favicon-512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
            other: [
                {
                    rel: "icon",
                    url: "/favicon-512-dark.png",
                    media: "(prefers-color-scheme: dark)",
                },
            ],
        },
    };
}
