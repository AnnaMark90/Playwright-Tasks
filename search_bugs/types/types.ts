import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly logWrapper: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator(".login_logo", { hasText: "Swag Labs" });
    this.logWrapper = page.locator(".login_wrapper-inner");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async fillingData(
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
}
export interface userData {
  username: string;
  password: string;
}

export interface userCheckoutData {
  firstname: string;
  lastname: string;
  postcode: number;
}

export const userSelectors = {
  username: "#user-name",
  password: "#password",
};

export const checkoutSelectors = {
  firstname: "#first-name",
  lastname: "#last-name",
  postcode: "#postal-code",
};

export const problemUser: userData = {
  username: "problem_user",
  //   username: "standard_user",
  password: "secret_sauce",
};

export const checkoutData: userCheckoutData = {
  firstname: "Ivan",
  lastname: "Ivanov",
  postcode: 110099,
};
