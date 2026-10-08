import {
  initialEducation,
  initialProject,
  initialResumeState,
  initialWorkExperience,
} from "@/app/lib/redux/resumeSlice";
import { initialSettings, type Settings } from "@/app/lib/redux/settingsSlice";
import type { RootState } from "@/app/lib/redux/store";
import { ENGLISH_FONT_FAMILIES, NON_ENGLISH_FONT_FAMILIES } from "@/components/fonts/constants";

const object = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
const strings = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .slice(0, 200)
        .map((item) => item.slice(0, 10000))
    : [];
function fields<T extends object>(defaults: T, value: unknown): T {
  const source = object(value);
  const result = structuredClone(defaults);
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const item = source[String(key)];
    if (typeof defaults[key] === "string" && typeof item === "string")
      result[key] = item.slice(0, 10000) as T[keyof T];
    if (Array.isArray(defaults[key])) result[key] = strings(item) as T[keyof T];
  }
  return result;
}
function entries<T extends object>(value: unknown, defaults: T): T[] {
  return Array.isArray(value)
    ? value
        .filter((item) => item && typeof item === "object" && !Array.isArray(item))
        .slice(0, 100)
        .map((item) => fields(defaults, item))
    : [structuredClone(defaults)];
}

/** Whitelist persisted data; malformed or old backups cannot crash the editor. */
export function validateState(value: unknown): RootState | undefined {
  const input = object(value);
  const profile = object(input.resume).profile;
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) return undefined;
  const source = object(input.resume);
  const skills = object(source.skills);
  const featured = Array.isArray(skills.featuredSkills) ? skills.featuredSkills : [];
  const resume = {
    profile: fields(initialResumeState.profile, source.profile),
    workExperiences: entries(source.workExperiences, initialWorkExperience),
    educations: entries(source.educations, initialEducation),
    projects: entries(source.projects, initialProject),
    skills: {
      descriptions: strings(skills.descriptions),
      featuredSkills: Array.from({ length: 6 }, (_, index) => {
        const item = object(featured[index]);
        return {
          skill: typeof item.skill === "string" ? item.skill.slice(0, 200) : "",
          rating:
            typeof item.rating === "number" && Number.isFinite(item.rating)
              ? Math.max(0, Math.min(5, Math.round(item.rating)))
              : 4,
        };
      }),
    },
    custom: { descriptions: strings(object(source.custom).descriptions) },
  };
  const settings = structuredClone(initialSettings);
  const stored = object(input.settings);
  if (["classic", "minimal", "executive"].includes(stored.template as string))
    settings.template = stored.template as string;
  if (typeof stored.themeColor === "string" && /^(#[a-f\d]{6}|)$/i.test(stored.themeColor))
    settings.themeColor = stored.themeColor;
  if ([...ENGLISH_FONT_FAMILIES, ...NON_ENGLISH_FONT_FAMILIES].includes(stored.fontFamily as never))
    settings.fontFamily = stored.fontFamily as string;
  const size = Number(stored.fontSize);
  if (size >= 8 && size <= 18) settings.fontSize = String(size);
  if (stored.documentSize === "A4" || stored.documentSize === "Letter")
    settings.documentSize = stored.documentSize;
  for (const group of ["formToShow", "formToHeading", "showBulletPoints"] as const) {
    const values = object(stored[group]);
    for (const key of Object.keys(settings[group])) {
      if (typeof values[key] === typeof (settings[group] as Record<string, unknown>)[key]) {
        (settings[group] as Record<string, unknown>)[key] =
          typeof values[key] === "string" ? (values[key] as string).slice(0, 100) : values[key];
      }
    }
  }
  if (Array.isArray(stored.formsOrder)) {
    const order = stored.formsOrder.filter(
      (form): form is Settings["formsOrder"][number] =>
        typeof form === "string" && Object.hasOwn(settings.formToShow, form)
    );
    settings.formsOrder = [...new Set([...order, ...settings.formsOrder])];
  }
  return { resume, settings };
}
