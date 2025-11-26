import { expect, selectors } from "@playwright/test";
import type { Page } from "@playwright/test";
import { userSelectors, checkoutSelectors } from "../types/types.js";
import type {
  userData,
  checkoutData,
  userCheckoutData,
} from "../types/types.js";

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
  await selectLocator.selectOption("Price (low to high)");
}

export async function verifyProductsSortedByLower(page: Page): Promise<void> {
  const prices = await page
    .locator('[data-test="inventory-item-price"]')
    .allTextContents();
  const priceNumbers = prices.map((price) =>
    parseFloat(price.replace("$", ""))
  );
  for (let i = 0; i < priceNumbers.length - 1; i++) {
    expect(Number(priceNumbers[i])).toBeLessThanOrEqual(
      Number(priceNumbers[i + 1])
    );
  }
}

export async function chooseAboutInBurger(page: Page): Promise<void> {
  const burgerLocator = page.locator("#react-burger-menu-btn");
  const menuWrapper = page.locator(".bm-menu-wrap");
  const aboutLink = page.locator("#about_sidebar_link");

  await burgerLocator.click();
  await expect(menuWrapper).toBeVisible();
  await aboutLink.click();
  await expect(page).toHaveURL("https://saucelabs.com/");
}

export async function addAndRemoveItem(page: Page): Promise<void> {
  const itemButton = page.locator('button[data-test*="sauce-labs-backpack"]');
  const cartBadge = page.locator(".shopping_cart_badge");

  await expect(itemButton).toHaveText("Add to cart");
  await itemButton.click();
  await expect(cartBadge).toHaveText("1");
  await expect(itemButton).toHaveText("Remove");

  await itemButton.click();
  await expect(cartBadge).toHaveCount(0);
  await expect(itemButton).toHaveText("Add to cart");
}

export async function openCheckoutForm(page: Page): Promise<void> {
  const cartLocator = page.locator("#shopping_cart_container");
  const checkBtn = page.locator("#checkout");

  await cartLocator.click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await checkBtn.click();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );
}

export async function fillingInCheckoutData(
  page: Page,
  data: userCheckoutData,
  fields: (keyof userCheckoutData)[]
): Promise<void> {
  for (const field of fields) {
    const selector = checkoutSelectors[field];
    const value = data[field];

    if (selector) {
      const stringValue = String(value);
      await page.fill(selector, stringValue);
      await expect(page.locator(selector)).toHaveValue(stringValue);
    }
  }
}
