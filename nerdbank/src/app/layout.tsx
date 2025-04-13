"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Script from "next/script";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css"



// Create QueryClient outside component
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/67d4cae96ba5a3190ad672f3/1imbjh8m2";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
        document.querySelectorAll(".dropdown-toggle").forEach((dropdown) => {
          new (window as any).bootstrap.Dropdown(dropdown);
        });
      });
    }

    // Hide dropdown on route change
    document.querySelectorAll(".dropdown-menu.show").forEach((dropdown) => {
      (dropdown as HTMLElement).classList.remove("show");
    });
  }, [pathname]); // Runs on every route change

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no" />
        <link href="images/favicon.png" rel="icon" />
        <title>NerdBank - Money Transfer and Online Payments</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
        />
        <link rel="stylesheet" type="text/css" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/font-awesome/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/daterangepicker/daterangepicker.css" />
        <link rel="stylesheet" type="text/css" href="/css/stylesheet.css" />
      </head>
      {/* 🔥 Use `key` on `<body>` to force re-mounting components on route change */}
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

        {/* Load JavaScript Libraries */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/jquery/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/vendor/daterangepicker/moment.min.js" strategy="afterInteractive" />
        <Script src="/vendor/daterangepicker/daterangepicker.js" strategy="afterInteractive" />
        <Script src="/js/switcher.min.js" strategy="afterInteractive" />
        <Script src="/js/theme.js" strategy="afterInteractive" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

      </body>
    </html>
  );
}
