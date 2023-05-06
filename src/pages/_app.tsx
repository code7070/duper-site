import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Inter, Playfair_Display } from "next/font/google";
import { store } from "@/store";
import PageHead from "./PageHead";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import "nprogress/nprogress.css";
import "@/styles/globals.css";
import "@/styles/fonts.scss";
import "@/styles/notion.scss";

library.add(faRotateRight);

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function App({ Component, pageProps }: AppProps) {
  const baseClass = "min-h-screen py-10 mx-auto";
  const fontClass = `${inter.variable} ${playfair.variable}`;
  return (
    <Provider store={store}>
      <PageHead />
      <main className={`${baseClass} ${fontClass}`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
