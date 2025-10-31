import {
  matchCityAndState,
  matchEmail,
  matchOnlyLetterSpaceOrPeriod,
  matchPhone,
  matchUrl,
} from "@/app/lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";
import type { TextItem } from "@/app/lib/parse-resume-from-pdf/types";

const makeTextItem = (text: string) =>
  ({
    text,
  }) as TextItem;

describe("extract-profile tests - ", () => {
  it("Name", () => {
    expect(matchOnlyLetterSpaceOrPeriod(makeTextItem("Leonardo W. DiCaprio"))?.[0]).toBe(
      "Leonardo W. DiCaprio"
    );
  });

  it("Name with diacritics", () => {
    expect(matchOnlyLetterSpaceOrPeriod(makeTextItem("Érica d'Ávila-Ferreira"))?.[0]).toBe(
      "Érica d'Ávila-Ferreira"
    );
  });

  it("Email", () => {
    expect(matchEmail(makeTextItem("  hello@open-resume.org  "))?.[0]).toBe(
      "hello@open-resume.org"
    );
  });

  it("Phone", () => {
    expect(matchPhone(makeTextItem("  (123)456-7890  "))?.[0]).toBe("(123)456-7890");
  });

  it("Phone pt-BR", () => {
    expect(matchPhone(makeTextItem("+55 (11) 99876-5432"))?.[0]).toBe("+55 (11) 99876-5432");
  });

  it("Url", () => {
    expect(matchUrl(makeTextItem("  linkedin.com/in/open-resume  "))?.[0]).toBe(
      "linkedin.com/in/open-resume"
    );
    expect(matchUrl(makeTextItem("hello@open-resume.org"))).toBeFalsy();
  });

  it("Location pt-BR", () => {
    expect(matchCityAndState(makeTextItem("São Paulo - SP"))?.[0]).toBe("São Paulo - SP");
    expect(matchCityAndState(makeTextItem("Rio de Janeiro, Rio de Janeiro"))?.[0]).toBe(
      "Rio de Janeiro, Rio de Janeiro"
    );
  });
});
