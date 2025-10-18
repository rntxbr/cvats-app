/**
 * Helper para rastreamento de eventos do Google Analytics
 * Verifica se gtag está disponível antes de chamar
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (
  action: string,
  params?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};

// Eventos específicos do CVAts
export const trackResumeDownload = () => {
  trackEvent("resume_download", {
    event_category: "conversion",
    event_label: "PDF Download",
  });
};

export const trackBuilderStarted = () => {
  trackEvent("builder_started", {
    event_category: "engagement",
  });
};

export const trackATSParserUsed = (fileName?: string) => {
  trackEvent("ats_parser_used", {
    event_category: "tool_usage",
    event_label: fileName || "Resume Upload",
  });
};

export const trackResumeImport = (fileName?: string) => {
  trackEvent("resume_import", {
    event_category: "engagement",
    event_label: fileName || "Import PDF",
  });
};
