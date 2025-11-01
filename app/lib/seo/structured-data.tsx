type StructuredDataProps = {
  type: "Organization" | "SoftwareApplication" | "WebSite" | "BreadcrumbList";
  data: Record<string, unknown>;
};

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

