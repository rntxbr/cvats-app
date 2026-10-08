import { validateState } from "@/app/lib/redux/validate-state";

test("rejects unrelated JSON and null", () => {
  expect(validateState(null)).toBeUndefined();
  expect(validateState({ settings: {} })).toBeUndefined();
});
test("keeps known templates and migrates unknown or legacy templates", () => {
  for (const template of ["classic", "minimal", "executive"]) {
    expect(
      validateState({ resume: { profile: {} }, settings: { template } })?.settings.template
    ).toBe(template);
  }
  for (const template of [undefined, "broken", { id: "classic" }]) {
    expect(
      validateState({ resume: { profile: {} }, settings: { template } })?.settings.template
    ).toBe("classic");
  }
});
test("migrates old profiles and normalizes malformed lists and settings", () => {
  const state = validateState({
    resume: {
      profile: { name: "Ana", email: 42 },
      skills: { featuredSkills: [null, { skill: "SQL", rating: 99 }] },
      workExperiences: [null, { company: "ABC", descriptions: [null, "Resultado"] }],
    },
    settings: {
      fontFamily: "missing",
      fontSize: "NaN",
      formsOrder: ["skills", "skills", "__proto__"],
      formToShow: { skills: false },
    },
  });
  expect(state?.resume.profile).toMatchObject({ name: "Ana", role: "", email: "" });
  expect(state?.resume.workExperiences[0].descriptions).toEqual(["Resultado"]);
  expect(state?.resume.skills.featuredSkills).toHaveLength(6);
  expect(state?.resume.skills.featuredSkills[1].rating).toBe(5);
  expect(state?.settings.fontFamily).toBe("Roboto");
  expect(new Set(state?.settings.formsOrder).size).toBe(5);
  expect(state?.settings.formToShow.skills).toBe(false);
});
