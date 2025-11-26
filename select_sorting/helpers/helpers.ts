import { Page, expect } from "playwright/test";

export interface userData {
  username: string;
  password: string;
}

export const standardUser: userData = {
  username: "standard_user",
  password: "secret_sauce",
};

export const userSelectors = {
  username: "#user-name",
  password: "#password",
};

export async function openPage(page: Page): Promise<void> {
  const response = await page.goto("https://www.saucedemo.com");
  if (!response || !response.ok()) {
    throw new Error(`Page failed to load: ${response?.status()}`);
  }
  const locator = page.locator(".login_logo");
  await expect(locator).toContainText("Swag Labs");
}

export async function fillingData(
  page: Page,
  data: userData,
  fields: (keyof userData)[]
): Promise<void> {
  for (const field of fields) {
    const selector = userSelectors[field];
    if (typeof selector === "string" && typeof data[field] === "string") {
      await page.fill(selector, data[field]);
    }
  }
}

export async function loginEnter(page: Page): Promise<void> {
  await page.click("#login-button");

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  const title = page.locator('span.title[data-test="title"]');
  await expect(title).toHaveText("Products");

  const inventoryContainer = page.locator(".inventory_container");
  await expect(inventoryContainer).toBeVisible();
}

export async function selectHigherSorting(page: Page): Promise<void> {
  const selectLocator = page.locator(
    'select[data-test="product-sort-container"]'
  );
  await selectLocator.click();
  await selectLocator.selectOption("Price (high to low)");
}

export async function verifyProductsSortedByPrice(page: Page): Promise<void> {
  const prices = await page
    .locator('[data-test="inventory-item-price"]')
    .allTextContents();
  const priceNumbers = prices.map((price) =>
    parseFloat(price.replace("$", ""))
  );
  for (let i = 0; i < priceNumbers.length - 1; i++) {
    expect(priceNumbers[i]).toBeGreaterThanOrEqual(priceNumbers[i + 1]);
  }
}
