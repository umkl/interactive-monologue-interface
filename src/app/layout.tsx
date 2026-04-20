import { Instrument_Sans, Instrument_Serif, Inter } from "next/font/google";
import "../style/index.css";

const instrument_sans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-instrument-sans",
    display: "swap",
});

const instrument_serif = Instrument_Serif({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-instrument-serif",
    weight: "400",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html
            className={`${instrument_sans.variable} ${inter.variable} ${instrument_serif.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
