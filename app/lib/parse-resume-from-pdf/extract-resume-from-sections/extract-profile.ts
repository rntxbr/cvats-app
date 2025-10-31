import {
  hasComma,
  hasLetter,
  hasLetterAndIsAllUpperCase,
  hasNumber,
  isBold,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getTextWithHighestFeatureScore } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import { getSectionLinesByKeywords } from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import type {
  FeatureSet,
  ResumeSectionToLines,
  TextItem,
} from "@/app/lib/parse-resume-from-pdf/types";

// Name (pt-BR): aceita letras unicode com acento, espaços, ponto, hífen e apóstrofo
// Exige no mínimo 7 caracteres úteis (desconsiderando espaços, ponto, apóstrofo e hífen) para evitar capturar UFs/abreviações
export const matchOnlyLetterSpaceOrPeriod = (item: TextItem) => {
  const normalized = item.text.replace(/[\s.'-]/g, "");
  if (normalized.length < 7) return null;
  return item.text.match(/^[\p{L}\p{M}\s.'-]+$/u);
};

// Email
// Simple email regex: xxx@xxx.xxx (xxx = anything not space)
export const matchEmail = (item: TextItem) => item.text.match(/\S+@\S+\.\S+/);
const hasAt = (item: TextItem) => item.text.includes("@");

// Phone (pt-BR)
// Suporta: opcional +55, DDD (2 dígitos), celular pode ter 9, separadores variados
export const matchPhone = (item: TextItem) =>
  item.text.match(/^(?:\+?55[\s-]?)?(?:\(?\d{2}\)?[\s-]?)?(?:9?\d{4}[\s-]?\d{4})$/);
const hasParenthesis = (item: TextItem) => /\(\d{2}\)/.test(item.text);

// Location (pt-BR)
// "Cidade - UF", "Cidade, UF" ou "Cidade, Estado" (com acentos)
const UFs = new Set([
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]);
// Match location patterns: "Cidade, UF", "Cidade - UF", "Cidade, Estado", or just "UF"
export const matchCityAndState = (item: TextItem) => {
  const text = item.text.trim();
  // Pattern 1: "Cidade, UF" or "Cidade - UF"
  const m = text.match(/^[\p{L}\p{M}\s.'-]+(?:\s*[-,]\s*)([A-Z]{2}|[\p{L}\p{M}\s.'-]+)$/u);
  if (m) {
    const tail = m[1];
    if (tail.length === 2) return UFs.has(tail) ? m : null;
    return m; // Estado por extenso
  }
  // Pattern 2: Just UF (2 uppercase letters) - common in Brazilian resumes
  if (text.length === 2 && /^[A-Z]{2}$/.test(text) && UFs.has(text)) {
    return [text, text] as RegExpMatchArray;
  }
  return null;
};

// Additional helper to detect standalone UF (Brazilian state acronym)
const matchStandaloneUF = (item: TextItem) => {
  const text = item.text.trim();
  if (text.length === 2 && /^[A-Z]{2}$/.test(text) && UFs.has(text)) {
    return [text, text] as RegExpMatchArray;
  }
  return null;
};

// Url (permite TLDs de 2+ letras)
export const matchUrl = (item: TextItem) => item.text.match(/\S+\.[a-z]{2,}\/\S+/i);
// Match https://xxx.xxx where s is optional
const matchUrlHttpFallback = (item: TextItem) => item.text.match(/https?:\/\/\S+\.\S+/);
// Match www.xxx.xxx
const matchUrlWwwFallback = (item: TextItem) => item.text.match(/www\.\S+\.\S+/);
const hasSlash = (item: TextItem) => item.text.includes("/");

// Summary
const has4OrMoreWords = (item: TextItem) => item.text.split(" ").length >= 4;

// Role (Job Title/Cargo) - Common job titles in Portuguese and English
const JOB_TITLES = [
  "Accountant", "Administrator", "Advisor", "Agent", "Analyst", "Apprentice", "Architect",
  "Assistant", "Associate", "Auditor", "CEO", "CTO", "Consultant", "Coordinator", "Developer",
  "Designer", "Director", "Engineer", "Founder", "Freelancer", "Head", "Intern", "Lead",
  "Manager", "Officer", "President", "Representative", "Researcher", "Specialist", "Supervisor",
  "Teacher", "Technician", "VP", "Analista", "Assistente", "Coordenador", "Coordenadora",
  "Diretor", "Diretora", "Engenheiro", "Engenheira", "Especialista", "Estagiario", "Estagiário",
  "Estagiaria", "Estagiária", "Gerente", "Lider", "Líder", "Supervisor", "Supervisora",
  "Professor", "Professora", "Pesquisador", "Pesquisadora", "Consultor", "Consultora",
  "Desenvolvedor", "Desenvolvedora", "Dev", "Programador", "Programadora", "Full", "Stack",
  "Full-Stack", "Fullstack", "Backend", "Back-end", "Back end", "Frontend", "Front-end", "Front end",
  "Cargo", "Posição", "Posicao", "Profissional",
];
const NORMALIZED_JOB_TITLES = JOB_TITLES.map((title) =>
  title.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")
);
const hasJobTitle = (item: TextItem) => {
  const normalizedText = item.text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  const words = normalizedText.split(/[\s,.;:()/-]+/).filter(Boolean);
  // Check if any job title is contained in the text (full match or partial)
  return NORMALIZED_JOB_TITLES.some((jobTitle) => {
    // Exact word match
    if (words.includes(jobTitle)) return true;
    // Also check if the job title is part of a word (e.g., "desenvolvedor" in "desenvolvedor full-stack")
    if (normalizedText.includes(jobTitle) && jobTitle.length >= 4) return true;
    return false;
  });
};
const has2To5Words = (item: TextItem) => {
  const wordCount = item.text.split(/\s/).length;
  return wordCount >= 2 && wordCount <= 5;
};

/**
 *              Unique Attribute
 * Name         Bold or Has all uppercase letter
 * Email        Has @
 * Phone        Has ()
 * Location     Has ,    (overlap with summary)
 * Url          Has slash
 * Summary      Has 4 or more words
 */

/**
 * Name -> contains only letters/space/period, e.g. Leonardo W. DiCaprio
 *         (it isn't common to include middle initial in resume)
 *      -> is bolded or has all letters as uppercase
 */
const NAME_FEATURE_SETS: FeatureSet[] = [
  [matchOnlyLetterSpaceOrPeriod, 3, true],
  [isBold, 2],
  [hasLetterAndIsAllUpperCase, 2],
  // Match against other unique attributes
  [hasAt, -4], // Email
  [hasNumber, -4], // Phone
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -2], // Summary
];

// Email -> match email regex xxx@xxx.xxx
const EMAIL_FEATURE_SETS: FeatureSet[] = [
  [matchEmail, 4, true],
  [isBold, -1], // Name
  [hasLetterAndIsAllUpperCase, -1], // Name
  [hasParenthesis, -4], // Phone
  [hasComma, -4], // Location
  [hasSlash, -4], // Url
  [has4OrMoreWords, -4], // Summary
];

// Phone -> match phone regex (xxx)-xxx-xxxx
const PHONE_FEATURE_SETS: FeatureSet[] = [
  [matchPhone, 4, true],
  [hasLetter, -4], // Name, Email, Location, Url, Summary
];

// Location -> match location regex <City>, <ST> or standalone UF
// Helper to check if text contains job title keywords (likely role, not location)
const hasRoleKeywords = (item: TextItem) => hasJobTitle(item);
// Helper to check if text matches the role exactly or contains it
const matchesRole = (item: TextItem, role: string): boolean => {
  if (!role) return false;
  const itemText = item.text.trim().toLowerCase();
  const roleText = role.trim().toLowerCase();
  return itemText === roleText || itemText.includes(roleText) || roleText.includes(itemText);
};
const createLocationFeatureSets = (role: string): FeatureSet[] => [
  [matchCityAndState, 4, true],
  [matchStandaloneUF, 4, true], // Also match standalone UFs (SP, RJ, etc.)
  [isBold, -1], // Name
  [(item) => matchesRole(item, role), -4], // Strongly penalize if it's the role
  [hasRoleKeywords, -4], // Penalize if contains job title keywords
  [has2To5Words, -3], // Role usually has 2-5 words, location is usually shorter or just UF
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasSlash, -4], // Url
];

// URL -> match url regex xxx.xxx/xxx
const URL_FEATURE_SETS: FeatureSet[] = [
  [matchUrl, 4, true],
  [matchUrlHttpFallback, 3, true],
  [matchUrlWwwFallback, 3, true],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [hasComma, -4], // Location
  [has4OrMoreWords, -4], // Summary
];

// Role -> contains job title keywords, usually 2-5 words, appears early in profile
// Helper to check if text is likely the name (long name pattern, bold, uppercase)
const isLikelyName = (item: TextItem, name: string) => {
  if (!name) return false;
  // Exact match
  if (item.text === name) return true;
  // Similar text (same length, similar content)
  const itemNormalized = item.text.toLowerCase().trim();
  const nameNormalized = name.toLowerCase().trim();
  if (itemNormalized === nameNormalized) return true;
  // Very long (names usually have 7+ chars useful chars)
  const normalized = item.text.replace(/[\s.'-]/g, "");
  if (normalized.length >= 7 && matchOnlyLetterSpaceOrPeriod(item) && isBold(item)) {
    return true;
  }
  return false;
};

// Helper to check if text looks like a long bold name (for role exclusion)
const isLongBoldName = (item: TextItem): boolean => {
  const match = matchOnlyLetterSpaceOrPeriod(item);
  return match !== null && isBold(item) && item.text.length > 15;
};

const createRoleFeatureSets = (name: string): FeatureSet[] => [
  [hasJobTitle, 4], // Maximum weight - job title is the strongest indicator
  [has2To5Words, 4], // Maximum weight - most job titles are 2-5 words
  [isBold, 2], // Often bolded
  // Heavy penalties for name-like characteristics (max -4 is the limit)
  [(item) => (name ? isLikelyName(item, name) : false), -4], // Strongly penalize if it's the name
  [isLongBoldName, -4], // Long bold names
  [hasAt, -4], // Email
  [hasNumber, -3], // Phone
  [hasParenthesis, -4], // Phone
  [(item) => matchCityAndState(item) !== null, -4], // Location (should have comma and state pattern)
  [(item) => matchStandaloneUF(item) !== null, -4], // Location (standalone UF)
  [hasSlash, -4], // Url
  [has4OrMoreWords, -2], // Summary (too long)
];

// Summary -> has 4 or more words
const SUMMARY_FEATURE_SETS: FeatureSet[] = [
  [has4OrMoreWords, 4],
  [isBold, -1], // Name
  [hasAt, -4], // Email
  [hasParenthesis, -3], // Phone
  [matchCityAndState, -4, false], // Location
  [hasJobTitle, -2], // Role (usually shorter)
];

export const extractProfile = (sections: ResumeSectionToLines) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();

  // Extract name first
  const [name, nameScores] = getTextWithHighestFeatureScore(textItems, NAME_FEATURE_SETS);
  
  // Remove name from consideration for role (filter out exact matches and similar)
  const textItemsWithoutName = name
    ? textItems.filter((item) => {
        const itemText = item.text.trim();
        const nameText = name.trim();
        if (itemText === nameText) return false;
        // Also filter very similar (case-insensitive match)
        if (itemText.toLowerCase() === nameText.toLowerCase()) return false;
        return true;
      })
    : textItems;
  
  // Role is typically found in the first few lines after the name
  // Try to find it in the first 5 lines or first 10 text items (excluding name)
  const profileLinesForRole = lines.slice(0, 5).flat();
  const roleTextItems = profileLinesForRole.length > 0 
    ? profileLinesForRole.filter((item) => {
        const itemText = item.text.trim();
        const nameText = name?.trim() || "";
        return itemText !== nameText && itemText.toLowerCase() !== nameText.toLowerCase();
      })
    : textItemsWithoutName.slice(0, 10);
  
  // Use dynamic feature sets that exclude the name
  const roleFeatureSets = createRoleFeatureSets(name);
  const [role, roleScores] = getTextWithHighestFeatureScore(roleTextItems, roleFeatureSets);
  
  // Remove both name and role from consideration for location
  // Need to check for partial matches because role might be split across textItems
  const textItemsWithoutNameAndRole = textItemsWithoutName.filter((item) => {
    const itemText = item.text.trim();
    const roleText = role?.trim() || "";
    if (!roleText) return true;
    
    // Exact match (case-insensitive)
    if (itemText.toLowerCase() === roleText.toLowerCase()) return false;
    
    // Check if itemText is contained in roleText or vice versa
    // This handles cases where role might be split: "Desenvolvedor" and "Full-Stack"
    const itemNormalized = itemText.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
    const roleNormalized = roleText.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
    
    // If itemText contains significant portion of roleText, exclude it
    // Check if itemText has 3+ words matching roleText words
    const itemWords = itemNormalized.split(/\s+/).filter(w => w.length > 2);
    const roleWords = roleNormalized.split(/\s+/).filter(w => w.length > 2);
    
    // If most words from role are in item, exclude it
    if (itemWords.length > 0 && roleWords.length > 0) {
      const matchingWords = roleWords.filter(rw => itemWords.some(iw => iw.includes(rw) || rw.includes(iw)));
      if (matchingWords.length >= Math.min(2, roleWords.length)) return false;
    }
    
    // Also check if one is contained in the other (handles partial matches)
    if (itemNormalized.length > 5 && roleNormalized.length > 5) {
      if (itemNormalized.includes(roleNormalized) || roleNormalized.includes(itemNormalized)) {
        return false;
      }
    }
    
    return true;
  });
  
  const [email, emailScores] = getTextWithHighestFeatureScore(textItems, EMAIL_FEATURE_SETS);
  const [phone, phoneScores] = getTextWithHighestFeatureScore(textItems, PHONE_FEATURE_SETS);
  
  // Use dynamic feature sets that exclude the role
  const locationFeatureSets = createLocationFeatureSets(role);
  const [location, locationScores] = getTextWithHighestFeatureScore(
    textItemsWithoutNameAndRole,
    locationFeatureSets
  );
  
  const [url, urlScores] = getTextWithHighestFeatureScore(textItems, URL_FEATURE_SETS);
  const [summary, summaryScores] = getTextWithHighestFeatureScore(
    textItems,
    SUMMARY_FEATURE_SETS,
    undefined,
    true
  );

  const summaryLines = getSectionLinesByKeywords(sections, [
    "summary",
    "resumo",
    "sobre",
    "perfil",
    "apresentação",
    "apresentacao",
  ]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");
  const objectiveLines = getSectionLinesByKeywords(sections, [
    "objective",
    "objetivo",
    "objetivos",
  ]);
  const objectiveSection = objectiveLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");

  return {
    profile: {
      name,
      role: role || "",
      email,
      phone,
      location,
      url,
      // Dedicated section takes higher precedence over profile summary
      summary: summarySection || objectiveSection || summary,
    },
    // For debugging
    profileScores: {
      name: nameScores,
      role: roleScores,
      email: emailScores,
      phone: phoneScores,
      location: locationScores,
      url: urlScores,
      summary: summaryScores,
    },
  };
};
