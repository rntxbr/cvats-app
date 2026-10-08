import { useContext } from "react";
import type { ResumeProfile } from "@/app/lib/redux/types";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "@/components/Resume/ResumePDF/common";
import { View } from "@/components/Resume/ResumePDF/primitives";
import { spacing, styles } from "@/components/Resume/ResumePDF/styles";
import { TemplateContext } from "@/components/Resume/ResumePDF/templates";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, role, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };
  const template = useContext(TemplateContext);
  const centered = template === "executive";

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{
          fontSize: template === "executive" ? "24pt" : template === "minimal" ? "18pt" : "20pt",
          textAlign: centered ? "center" : "left",
        }}
      >
        {name}
      </ResumePDFText>
      {role && (
        <ResumePDFText
          style={{
            fontSize: template === "minimal" ? "12pt" : "14pt",
            fontWeight: "500",
            marginTop: spacing["0.5"],
            textAlign: centered ? "center" : "left",
          }}
        >
          {role}
        </ResumePDFText>
      )}
      <View
        style={{
          ...styles.flexRowBetween,
          ...(centered ? { justifyContent: "center", gap: 12 } : {}),
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
      {summary && (
        <>
          <ResumePDFText bold={true} style={{ marginTop: spacing["3"] }}>
            RESUMO PROFISSIONAL
          </ResumePDFText>
          <ResumePDFText>{summary}</ResumePDFText>
        </>
      )}
    </ResumePDFSection>
  );
};
