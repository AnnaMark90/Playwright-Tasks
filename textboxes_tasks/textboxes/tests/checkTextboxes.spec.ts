import { test, expect, type Page } from '@playwright/test';

const inputData = {
    name: 'Иван Петров',
    validEmail: 'petrov@email.com',
    unvalidEmail: 'petrov',
    currAddress: 'ул. Пушкина, 15, кв. 42, Москва, 101000',
    permAddress: 'пр. Ленина, 8, Санкт-Петербург, 190000',
};

// page не вынести вне теста, т.к. его ещё не существует
const outputLocators = (page: Page) => {
    const output = page.locator('#output');
    return {
        root: output,
        name: output.locator('#name'),
        email: output.locator('#email'),
        currAddress: output.locator('#currentAddress'),
        permAddress: output.locator('#permanentAddress')
    };
};

// async function require declare return type Promise
async function openPageDemoqa (page: Page): Promise<void> { 
    await page.goto('https://demoqa.com/text-box',  { timeout: 60000 });
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();
}

test('fill in data to the form', async ({ page }) => {
    await openPageDemoqa(page);

    await page.fill('#userName', inputData.name);
    await page.fill('#userEmail', inputData.validEmail);
    await page.fill('#currentAddress', inputData.currAddress);
    await page.fill('textarea#permanentAddress',inputData.permAddress);
    await page.getByRole('button', {name: 'Submit'}).click();

    const output = outputLocators(page);
    await expect(output.root).toBeVisible();

    await expect(output.name).toContainText(inputData.name);
    await expect(output.email).toContainText(inputData.validEmail);
    await expect(output.currAddress).toContainText(inputData.currAddress);
    await expect(output.permAddress).toContainText(inputData.permAddress);
});

test('fill in uvalid email to the form', async ({ page }) => {
    await openPageDemoqa(page);

    await page.fill('#userEmail', inputData.unvalidEmail);
    await page.getByRole('button', {name: 'Submit'}).click();

    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
});

test('fill in data except email to the form', async ({ page }) => {
    await openPageDemoqa(page);

    await page.fill('#userName', inputData.name);
    await page.fill('#currentAddress', inputData.currAddress);
    await page.fill('#permanentAddress',inputData.permAddress);

    await page.getByRole('button', {name: 'Submit'}).click();

    const output = outputLocators(page);
    await expect(output.root).toBeVisible();
    await expect(output.name).toContainText(inputData.name);
    await expect(output.currAddress).toContainText(inputData.currAddress);
    await expect(output.permAddress).toContainText(inputData.permAddress);
});