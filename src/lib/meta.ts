import { Metadata } from "next";
import { readPublicJson } from "./read-assets";

export async function getMetadata() {
    try {
        return readPublicJson("metadata.json");
    } catch (e) {
        throw new Error("Failed to load metadata.json", { cause: e as Error });
    }
}

export async function generateMonologueMetadata(): Promise<Metadata> {
    return {
        ...(await getMetadata()),
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
