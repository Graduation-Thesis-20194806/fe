import localFont from "next/font/local";
import "./globals.css";
import '../styles/index.scss'
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { ConfigProvider } from "antd";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <ConfigProvider theme={{
        token:{
          colorPrimary: '#396148',
          colorTextBase: '#4C4C4C',
          colorBorder: '#E6E6E6'
        }
      }}>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
          </body>
        </html>
      </ConfigProvider>
    </ReactQueryClientProvider>
  );
}
