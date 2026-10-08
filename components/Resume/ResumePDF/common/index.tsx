import { Link } from "@react-pdf/renderer";
import { useContext } from "react";
import { DEBUG_RESUME_PDF_FLAG } from "@/app/lib/constants";
import { DEFAULT_FONT_COLOR } from "@/app/lib/redux/settingsSlice";
import { Text, View } from "@/components/Resume/ResumePDF/primitives";
import { spacing, styles } from "@/components/Resume/ResumePDF/styles";
import { TemplateContext } from "@/components/Resume/ResumePDF/templates";

export const ResumePDFSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: any;
  children: React.ReactNode;
}) => {
  const template = useContext(TemplateContext);
  return (
    <View
      style={{
        ...styles.flexCol,
        gap: spacing["2"],
        marginTop: template === "minimal" ? spacing["3"] : spacing["5"],
        ...style,
      }}
    >
      {heading && (
        <View
          style={{
            ...styles.flexRow,
            alignItems: "center",
            ...(template !== "classic"
              ? {
                  borderBottomWidth: template === "executive" ? 1.5 : 0.5,
                  borderBottomColor: themeColor || DEFAULT_FONT_COLOR,
                  paddingBottom: 4,
                }
              : {}),
          }}
        >
          {themeColor && template === "classic" && (
            <View
              style={{
                height: "3.75pt",
                width: "30pt",
                backgroundColor: themeColor,
                marginRight: spacing["3.5"],
              }}
              debug={DEBUG_RESUME_PDF_FLAG}
            />
          )}
          <Text
            minPresenceAhead={24}
            style={{
              fontWeight: "bold",
              color: template === "executive" ? themeColor : DEFAULT_FONT_COLOR,
              letterSpacing: "0.3pt", // tracking-wide -> 0.025em * 12 pt = 0.3pt
            }}
            debug={DEBUG_RESUME_PDF_FLAG}
          >
            {heading}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};

export const ResumePDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean;
  themeColor?: string;
  style?: any;
  children: React.ReactNode;
}) => {
  return (
    <Text
      style={{
        color: themeColor || DEFAULT_FONT_COLOR,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
      debug={DEBUG_RESUME_PDF_FLAG}
    >
      {children}
    </Text>
  );
};

export const ResumePDFBulletList = ({
  items,
  showBulletPoints = true,
}: {
  items: string[];
  showBulletPoints?: boolean;
}) => {
  return (
    <>
      {items
        .filter((item) => item.trim())
        .map((item, idx) => (
          <View style={{ ...styles.flexRow }} key={idx}>
            {showBulletPoints && (
              <ResumePDFText
                style={{
                  paddingLeft: spacing["2"],
                  paddingRight: spacing["2"],
                  lineHeight: "1.3",
                }}
                bold={true}
              >
                {"•"}
              </ResumePDFText>
            )}
            {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
            <ResumePDFText style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}>
              {item}
            </ResumePDFText>
          </View>
        ))}
    </>
  );
};

export const ResumePDFLink = ({
  src,
  isPDF,
  children,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return (
    <a href={src} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export const ResumeFeaturedSkill = ({
  skill,
  rating,
  themeColor,
  style = {},
}: {
  skill: string;
  rating: number;
  themeColor: string;
  style?: any;
}) => {
  const numCircles = 5;

  return (
    <View style={{ ...styles.flexRow, alignItems: "center", ...style }}>
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>{skill}</ResumePDFText>
      {[...Array(numCircles)].map((_, idx) => (
        <View
          key={idx}
          style={{
            height: "9pt",
            width: "9pt",
            marginLeft: "2.25pt",
            backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
            borderRadius: "4.5pt",
          }}
        />
      ))}
    </View>
  );
};
