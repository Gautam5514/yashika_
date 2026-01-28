import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata = {
  title: "Happy Birthday Gautam ❤️",
  description: "A surprise for the most beautiful person.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${greatVibes.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
