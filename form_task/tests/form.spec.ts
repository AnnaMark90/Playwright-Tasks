import { test, expect, type Page } from "@playwright/test";
import {
  formSelectors,
  validData,
  TestDataInvalEmail,
  DataObligatory,
  DataWithoutName,
  DataWithoutObl,
} from "../types/types";
import {
  openPageDemoqa,
  fillAllTextData,
  chooseOption,
  chooseDateOfBirth,
  selectLocation,
  submitForm,
  uploadImage,
  expectTableValues,
  showModal,
  closeModal,
  fillPartialTextData,
  invalidHighlight,
  expectTableOneValue,
  validHighlight,
} from "../helpers/helpers";

test.describe("testing form", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);

    await openPageDemoqa(page);
  });

  test("filling in valid data", async ({ page }) => {
    await fillAllTextData(page, validData);

    await chooseOption(page, "gender", [validData.gender]);
    await chooseOption(page, "subjects", [...validData.subjects]);
    await chooseOption(page, "hobbies", [...validData.hobbies]);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);

    await submitForm(page);

    await showModal(page);
    await expectTableValues(page, validData);
    await closeModal(page);
  });

  test("filling in data without obligatory ones", async ({ page }) => {
    await fillPartialTextData(page, DataWithoutObl, ["email", "currentAddress"]);

    await chooseDateOfBirth(page, DataWithoutObl.birthDate);
    await uploadImage(page, DataWithoutObl.picture);
    await selectLocation(page, DataWithoutObl.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.firstName);
    await invalidHighlight(page, formSelectors.lastName);
    await invalidHighlight(page, formSelectors.mobile);
  });

  test("filling only obligatory data", async ({ page }) => {
    await fillPartialTextData(page, DataObligatory, [
      "firstName",
      "lastName",
      "mobile",
    ]);
    await chooseOption(page, "gender", [DataObligatory.gender]);

    await submitForm(page);

    await showModal(page);
    await expectTableOneValue(
      page,
      "Student Name",
      `${DataObligatory.firstName} ${DataObligatory.lastName}`
    );
    await expectTableOneValue(page, "Gender", `${DataObligatory.gender}`);
    await expectTableOneValue(page, "Mobile", `${DataObligatory.mobile}`);
    // отображается дефолтная дата рождения (дата заполнения)

    await closeModal(page);
  });

  test("filling not valid email", async ({ page }) => {
    await fillAllTextData(page, TestDataInvalEmail);

    await chooseOption(page, "gender", [TestDataInvalEmail.gender]);
    await chooseOption(page, "subjects", [...TestDataInvalEmail.subjects]);
    await chooseOption(page, "hobbies", [...TestDataInvalEmail.hobbies]);

    await chooseDateOfBirth(page, TestDataInvalEmail.birthDate);
    await uploadImage(page, TestDataInvalEmail.picture);
    await selectLocation(page, TestDataInvalEmail.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.email);

    await validHighlight(page, formSelectors.lastName);
    await validHighlight(page, formSelectors.gender("Male"));
    await validHighlight(page, formSelectors.mobile);
    await validHighlight(page, formSelectors.birthDate);
    await validHighlight(page, formSelectors.subjectsInput);
    await validHighlight(page, formSelectors.currentAddress);
  });

  test("filling data without name", async ({ page }) => {
    await fillPartialTextData(page, DataWithoutName, [
      "lastName",
      "email",
      "mobile",
      "currentAddress",
    ]);

    await chooseOption(page, "gender", [DataWithoutName.gender]);
    await chooseOption(page, "subjects", [...DataWithoutName.subjects]);
    await chooseOption(page, "hobbies", [...DataWithoutName.hobbies]);

    await chooseDateOfBirth(page, DataWithoutName.birthDate);
    await uploadImage(page, DataWithoutName.picture);
    await selectLocation(page, DataWithoutName.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.firstName);
    await validHighlight(page, formSelectors.lastName);
    await validHighlight(page, formSelectors.email);
    await validHighlight(page, formSelectors.gender("Female"));
    await validHighlight(page, formSelectors.mobile);
    await validHighlight(page, formSelectors.birthDate);
    await validHighlight(page, formSelectors.subjectsInput);
    await validHighlight(page, formSelectors.currentAddress);
  });
});