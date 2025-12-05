import { test } from "@playwright/test";
import {
  selectHigherSorting,
  loginEnter,
  verifyProductsSortedByLower,
  chooseAboutInBurger,
  addAndRemoveItem,
  openCheckoutForm,
  fillingInCheckoutData,
} from "../helpers/helpers.js";
import { checkoutData, problemUser, LoginPage } from "../types/types.js";

test.describe("finding bugs on platfoorm", () => {
  test.beforeEach(async ({ page }) => {
    const playwrightDev = new LoginPage(page);
    await playwrightDev.goto();
    await playwrightDev.fillingData(page, problemUser, [
      "username",
      "password",
    ]);
    await loginEnter(playwrightDev.page);
  });

  test("display products from low", async ({ page }) => {
    await selectHigherSorting(page);
    await verifyProductsSortedByLower(page);
  });

  test("transition to about page", async ({ page }) => {
    await chooseAboutInBurger(page);
  });

  test("removing product from a cart", async ({ page }) => {
    await addAndRemoveItem(page);
  });

  test("filling in data to checkout", async ({ page }) => {
    await openCheckoutForm(page);
    await fillingInCheckoutData(page, checkoutData, [
      "firstname",
      "lastname",
      "postcode",
    ]);
  });
});
