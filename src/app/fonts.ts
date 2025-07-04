import { Poppins, Signika } from "next/font/google";
import localFont from "next/font/local";


export const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "700"]
})

export const signika = Signika({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"]
})

export const evogria = localFont({
  src: "../../public/fonts/Evogria.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-yoshida",
  preload: true,
});

export const bootstrapIcons = localFont({
  src: "../../public/fonts/bootstrap-icons.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-yoshida",
  preload: true,
});