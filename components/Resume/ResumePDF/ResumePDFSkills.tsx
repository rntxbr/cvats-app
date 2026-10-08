import type { ResumeSkills } from "@/app/lib/redux/types";
import {
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFText,
} from "@/components/Resume/ResumePDF/common";
import { View } from "@/components/Resume/ResumePDF/primitives";
import { styles } from "@/components/Resume/ResumePDF/styles";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions, featuredSkills } = skills;
  const featuredSkillsWithText = featuredSkills.filter((item) => item.skill);

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {featuredSkillsWithText.length > 0 && (
        <ResumePDFText>{featuredSkillsWithText.map((item) => item.skill).join(", ")}</ResumePDFText>
      )}
      <View style={{ ...styles.flexCol }}>
        <ResumePDFBulletList items={descriptions} showBulletPoints={showBulletPoints} />
      </View>
    </ResumePDFSection>
  );
};
