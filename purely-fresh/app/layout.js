import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata = {
  title: "Purely Fresh",
  description: "Detect the freshness of fruits and vegetables along with a nutritionist bot.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo-fill-circle-trans.png" />
        <meta name="description" content={metadata.description} />
        <meta name="title" content={metadata.title} />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
