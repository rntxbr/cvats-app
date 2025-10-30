"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  // Não renderiza se não houver ID configurado
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* Pageview em mudanças de rota (App Router) */}
      <RouteChangeTracker measurementId={GA_MEASUREMENT_ID} pathname={pathname || '/'} />
    </>
  );
};

function RouteChangeTracker({
  measurementId,
  pathname,
}: {
  measurementId: string;
  pathname: string;
}) {
  useEffect(() => {
    if (!measurementId || !pathname) return;
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("config", measurementId, { page_path: pathname });
    }
  }, [measurementId, pathname]);
  return null;
}