import { test, expect } from '@playwright/test';

// вынести output как глобал константу 
// дублирование кода? 

test('fill in data to the form', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    await page.fill('input#userName.form-control', 'Иван Петров');
    await page.fill('input#userEmail.form-control', 'petrov@email.com');
    await page.fill('textarea#currentAddress.form-control', 'ул. Пушкина, 15, кв. 42, Москва, 101000');
    await page.fill('textarea#permanentAddress.form-control', 'пр. Ленина, 8, Санкт-Петербург, 190000');

    await page.getByRole('button', {name: 'Submit'}).click();

    const output = page.locator('#output');
    await expect(output).toBeVisible();

    await expect(output.locator('#name')).toContainText('Иван Петров');
    await expect(output.locator('#email')).toContainText('petrov@email.com');
    await expect(output.locator('#currentAddress')).toContainText('ул. Пушкина, 15, кв. 42, Москва, 101000');
    await expect(output.locator('#permanentAddress')).toContainText('пр. Ленина, 8, Санкт-Петербург, 190000');
});

test('fill in uvalid email to the form', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    await page.fill('input#userEmail.form-control', 'petrovemail');

    await page.getByRole('button', {name: 'Submit'}).click();

    await expect(page.locator('input#userEmail.form-control')).toHaveClass(/field-error/);
});

test('fill in data except email to the form', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    await page.fill('input#userName.form-control', 'Иван Петров');
    await page.fill('textarea#currentAddress.form-control', 'ул. Пушкина, 15, кв. 42, Москва, 101000');
    await page.fill('textarea#permanentAddress.form-control', 'пр. Ленина, 8, Санкт-Петербург, 190000');

    await page.getByRole('button', {name: 'Submit'}).click();

    const output = page.locator('#output')
    await expect(output).toBeVisible();

    await expect(output.locator('#name')).toContainText('Иван Петров');
    await expect(output.locator('#currentAddress')).toContainText('ул. Пушкина, 15, кв. 42, Москва, 101000');
    await expect(output.locator('#permanentAddress')).toContainText('пр. Ленина, 8, Санкт-Петербург, 190000');
});