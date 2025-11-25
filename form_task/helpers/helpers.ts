import { expect, type Page } from "@playwright/test";
import type { userData } from "../types/types";
import path from "path";
import { formSelectors } from "../types/types";

export async function openPageDemoqa(page: Page): Promise<void> {
  const response = await page.goto(
    "https://demoqa.com/automation-practice-form"
  );
  if (!response || !response.ok()) {
    throw new Error(`Page failed to load: ${response?.status()}`);
  }
  await expect(
    page.getByRole("heading", { name: "Practice Form" })
  ).toBeVisible();
}

export async function fillAllTextData(
  page: Page,
  data: userData
): Promise<void> {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "mobile",
    "currentAddress",
  ] as const;
  for (const field of fields) {
    await page.fill(formSelectors[field], data[field]);
  }
}

export async function fillPartialTextData(
  page: Page,
  data: userData,
  fields: (keyof userData)[]
): Promise<void> {
  for (const field of fields) {
    const selector = formSelectors[field];
    if (typeof selector === "string" && typeof data[field] === "string") {
      await page.fill(selector, data[field]);
    }
  }
}

export async function chooseOption(
  page: Page,
  optionKind: string,
  values: string[]
): Promise<void> {
  if (optionKind === "subjects") {
    const input = page.locator("#subjectsInput");
    for (const elem of values) {
      await input.click();
      await input.fill("");
      await input.pressSequentially(elem);
      const option = page
        .locator(
          ".subjects-auto-complete__menu-list div.subjects-auto-complete__option"
        )
        .filter({ hasText: elem });
      await option.waitFor({ state: "visible", timeout: 5000 });
      await option.click();
    }
    await expect(
      page.locator(".subjects-auto-complete__multi-value__label")
    ).toHaveCount(values.length);
  } else if (optionKind === "gender") {
    const genderMap: Record<string, string> = {
      Male: 'label[for="gender-radio-1"]',
      Female: 'label[for="gender-radio-2"]',
      Other: 'label[for="gender-radio-3"]',
    };
    const genderLabel = page.locator(genderMap[values[0]]);
    await genderLabel.waitFor({ state: "visible", timeout: 10000 });
    await genderLabel.click();
  } else if (optionKind === "hobbies") {
    for (const elem of values) {
      const hobbyLabel = page.getByLabel(elem);
      await hobbyLabel.waitFor({ state: "visible", timeout: 10000 });
      await hobbyLabel.click({ force: true });
    }
  }
}

export async function chooseDateOfBirth(page: Page, birthDate: string) {
  let date = new Date(birthDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth().toString();
  const year = date.getFullYear().toString();

  await page.click("#dateOfBirthInput");

  await page.selectOption(".react-datepicker__year-select", year);
  await page.selectOption(".react-datepicker__month-select", month);

  await page.click(
    `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`
  );
}

export async function selectLocation(
  page: Page,
  location: { state: string; city: string }
): Promise<void> {
  await page.waitForTimeout(500);

  await page.locator(formSelectors.state).click();
  await page
    .locator(".css-26l3qy-menu div.css-1n7v3ny-option", {
      hasText: location.state,
    })
    .click();

  await page.locator(formSelectors.city).click();
  await page
    .locator(".css-26l3qy-menu div.css-1n7v3ny-option", {
      hasText: location.city,
    })
    .click();
}

export async function uploadImage(page: Page, picName: string): Promise<void> {
  const absolutePath = path.resolve(__dirname, "../images", picName);
  await page.locator(formSelectors.picture).setInputFiles(absolutePath);
}

export async function submitForm(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Submit" }).click();
}

export function convertDateToModalFormat(date: string): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();

  return `${day} ${month},${year}`;
}

export async function showModal(page: Page) {
  const modal = page.locator(".modal-content");
  await modal.waitFor({ state: "visible", timeout: 80000 });
  await expect(modal).toBeVisible({ timeout: 80000 });
}

export async function expectTableValues(page: Page, data: any): Promise<void> {
  const tableMap: Record<string, string> = {
    "Student Name": `${data.firstName} ${data.lastName}`,
    "Student Email": data.email,
    Gender: data.gender,
    Mobile: data.mobile,
    "Date of Birth": convertDateToModalFormat(data.birthDate),
    // Subjects: data.subjects.join(", "),
    // Hobbies: data.hobbies.join(", "),
    Picture: data.picture,
    Address: data.currentAddress,
    "State and City": `${data.stateCity.state} ${data.stateCity.city}`,
  };

  const modal = page.locator(".modal-content");
  for (const [label, expected] of Object.entries(tableMap)) {
    const row = modal.getByRole("row", { name: label });
    await expect(row.getByRole("cell").nth(1)).toHaveText(expected);
  }
}

export async function expectTableOneValue(
  page: Page,
  label: string,
  expectedValue: string
): Promise<void> {
  const modal = page.locator(".modal-content");
  const row = modal.getByRole("row", { name: label });
  await expect(row.getByRole("cell").nth(1)).toHaveText(expectedValue);
}

export async function closeModal(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Close" }).click({ force: true });
}

export async function emptyValue(
  page: Page,
  fieldSelector: string
): Promise<void> {
  await expect(page.locator(fieldSelector)).toHaveValue("");
}

export async function invalidHighlight(
  page: Page,
  fieldSelector: string
): Promise<void> {

  await expect(page.locator(`${fieldSelector}:invalid`)).toBeVisible({
    timeout: 90000,
  });
}

export async function validHighlight(
  page: Page,
  fieldSelector: string
): Promise<void> {

  await expect(page.locator(`${fieldSelector}:valid`)).toBeVisible({
    timeout: 90000,
  });
}