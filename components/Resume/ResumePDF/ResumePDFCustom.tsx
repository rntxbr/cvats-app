import { View } from "@react-pdf/renderer";
import type { ResumeCustom } from "@/app/lib/redux/types";
import { ResumePDFBulletList, ResumePDFSection } from "@/components/Resume/ResumePDF/common";
import { styles } from "@/components/Resume/ResumePDF/styles";

export const ResumePDFCustom = ({
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  custom: ResumeCustom;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions } = custom;

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      <View style={{ ...styles.flexCol }}>
        <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints} />
      </View>
    </ResumePDFSection>
  );
};
