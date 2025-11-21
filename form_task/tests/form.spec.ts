import { test, expect, type Page } from "@playwright/test";
import type { userData } from "../types/types";
import { formSelectors, validData } from "../types/types";
import {
  openPageDemoqa,
  fillTextData,
  chooseOption,
  chooseDateOfBirth,
  selectLocation,
  submitForm,
  uploadImage,
} from "../helpers/helpers";

test.describe("testing form", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);

    await openPageDemoqa(page);
  });

  test.afterEach(async ({ page }) => {
    await submitForm(page);
  });

  test("fill in valid data", async ({ page }) => {
    await fillTextData(page, validData);

    await chooseOption(page, "subject", [...validData.subjects]);
    await chooseOption(page, "gender", [validData.gender]);
    await chooseOption(page, "hobbies", [...validData.hobbies]);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);
  });
});
