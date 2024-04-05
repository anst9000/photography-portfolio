import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Architects_Daughter } from "next/font/google"

const architectsDaughter = Architects_Daughter({
  weight: "400",
  style: "normal",
  variable: "--font-architects-daughter",
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${architectsDaughter.variable} font-sans h-full`}>
      <Component {...pageProps} />
    </div>
  )
}
