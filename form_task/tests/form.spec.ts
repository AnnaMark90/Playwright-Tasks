import { test, expect, type Page } from "@playwright/test";
import { formSelectors, validData, TestDataInvalEmail } from "../types/types";
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
} from "../helpers/helpers";

test.describe("testing form", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);

    await openPageDemoqa(page);
  });

  test("filling in valid data", async ({ page }) => {
    await fillAllTextData(page, validData);

    await chooseOption(page, "gender", [validData.gender]);
    // await chooseOption(page, "subject", [...validData.subjects]);
    // await chooseOption(page, "hobbies", [...validData.hobbies]);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);

    await submitForm(page);

    await showModal(page);
    await expectTableValues(page, validData);
    await closeModal(page);
  });

  test("filling in data without obligatory ones", async ({ page }) => {
    await fillPartialTextData(page, validData, ["email", "currentAddress"]);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.firstName);
    await invalidHighlight(page, formSelectors.lastName);
    await invalidHighlight(page, formSelectors.mobile);
  });

  test("filling in only obligatory data", async ({ page }) => {
    await fillPartialTextData(page, validData, [
      "firstName",
      "lastName",
      "email",
      "mobile",
    ]);
    await chooseOption(page, "gender", [validData.gender]);

    await submitForm(page);

    await showModal(page);
    await expectTableOneValue(
      page,
      "Student Name",
      `${validData.firstName} ${validData.lastName}`
    );
    await expectTableOneValue(page, "Student Email", `${validData.email}`);
    await expectTableOneValue(page, "Mobile", `${validData.mobile}`);
    // отображается дефолтная дата рождения (дата заполнения)

    await closeModal(page);
  });

  test("filling in valid data and invalid email", async ({ page }) => {
    await fillAllTextData(page, TestDataInvalEmail);

    await chooseOption(page, "gender", [TestDataInvalEmail.gender]);
    // await chooseOption(page, "subject", [...TestDataInvalEmail.subjects]);
    // await chooseOption(page, "hobbies", [...TestDataInvalEmail.hobbies]);

    await chooseDateOfBirth(page, TestDataInvalEmail.birthDate);
    await uploadImage(page, TestDataInvalEmail.picture);
    await selectLocation(page, TestDataInvalEmail.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.email);
    // написать проверку на остальные поля с псевдокласами :valid
    // Current Address, Hobbies, Mobile(10 Digits), Date of Birth, Name, Gender validHighlight()
  });

  test("fill all valid data without name", async ({ page }) => {
    await fillPartialTextData(page, validData, [
      "lastName",
      "email",
      "mobile",
      "currentAddress",
    ]);

    await chooseOption(page, "gender", [validData.gender]);
    // await chooseOption(page, "subject", [...validData.subjects]);
    // await chooseOption(page, "hobbies", [...validData.hobbies]);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);

    await submitForm(page);

    await invalidHighlight(page, formSelectors.firstName);
    // написать проверку на остальные поля с псевдокласами :valid и :invalid
  });
});
