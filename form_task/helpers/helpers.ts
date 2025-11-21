import { test, expect, type Page } from "@playwright/test";
import type { userData } from "../types/types";
import { formSelectors, validData } from "../types/types";

export async function openPageDemoqa(page: Page): Promise<void> {
    const response = await page.goto("https://demoqa.com/automation-practice-form");
    if (!response || !response.ok()) {
    throw new Error(`Page failed to load: ${"https://demoqa.com/automation-practice-form"} (status: ${response?.status()})`);
    }
    await expect(
        page.getByRole("heading", { name: "Practice Form" })
    ).toBeVisible();
}

export async function fillTextData(page: Page, data: userData): Promise<void> {
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

export async function chooseOption(
  page: Page,
  optionKind: string,
  values: string[]
): Promise<void> {
  for (const elem of values) {
    switch (optionKind) {
      case "subjects": {
        const input = page.locator("#subjectsInput");
        await input.fill(elem);

        const dropdownOption = page.locator(
          `.subjects-auto-complete__menu-list div:has-text("${elem}")`
        );
        await dropdownOption.waitFor({ state: "visible", timeout: 10000 });
        await dropdownOption.click();
        break;
      }

      case "gender": {
        const genderLabelSelectorMap: Record<string, string> = {
          Male: 'label[for="gender-radio-1"]',
          Female: 'label[for="gender-radio-2"]',
          Other: 'label[for="gender-radio-3"]',
        };
        const genderLabel = page.locator(genderLabelSelectorMap[elem]);
        await genderLabel.waitFor({ state: "visible", timeout: 10000 });
        await genderLabel.click({ force: true });
        break;
      }

      case "hobbies": {
        const hobbyLabel = page.getByLabel(elem);
        await hobbyLabel.waitFor({ state: "visible", timeout: 10000 });
        await hobbyLabel.click({ force: true });
        break;
      }
    }
  }
}

export async function chooseDateOfBirth(page: Page, birthDate: string) {
  let date = new Date(birthDate); // '2000-05-15'

  const day = String(date.getDate()).padStart(2, "0"); // "15"
  const month = date.getMonth().toString(); // 0–11 → "4"
  const year = date.getFullYear().toString(); // "2000"

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
  await page.locator(formSelectors.state).click();
  await page
    .locator(".css-26l3qy-menu div.css-1n7v3ny-option", { hasText: location.state })
    .click();

  await page.locator(formSelectors.city).click();
  await page
    .locator(".css-26l3qy-menu div.css-1n7v3ny-option", { hasText: location.city })
    .click();
}

export async function uploadImage(
  page: Page,
  imagePath: string
): Promise<void> {
  await page.locator(formSelectors.picture).setInputFiles(validData.picture);
}

export async function submitForm(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Submit" }).click();
}
