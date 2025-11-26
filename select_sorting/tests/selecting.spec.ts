import { test, expect, Page } from "@playwright/test";
import {
  fillingData,
  loginEnter,
  openPage,
  selectHigherSorting,
  standardUser,
  verifyProductsSortedByPrice,
} from "../helpers/helpers";

test("display selecting products", async ({ page }) => {
  await openPage(page);
  await fillingData(page, standardUser, ["username", "password"]);
  await loginEnter(page);
  await selectHigherSorting(page);
  await verifyProductsSortedByPrice(page);
});
