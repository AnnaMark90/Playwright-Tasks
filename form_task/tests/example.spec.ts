import { test, expect, type Page } from '@playwright/test';
import type { userData } from '../types/types';
import { formSelectors } from '../types/types';

const validData: userData = {
    firstName: 'Alex',
    lastName: 'Ivanov',
    email: 'ivanov@mail.com',
    gender: 'Male',
    mobile: '2912345678',
    birthDate: '2000-05-15',
    subjects: ['Math', 'Physics', 'English'],
    hobbies: ['Sports', 'Reading'],
    picture: './images/image.png',
    currentAddress: 'ул. Ленина, д. 10, Минск',
    stateCity: {
        state: 'NCR',
        city: 'Delhi',
    },
};

async function openPageDemoqa(page: Page): Promise<void> {
    await page.goto('https://demoqa.com/automation-practice-form', { timeout: 70000 });
    await expect(page.getByRole('heading', { name: 'Practice Form' })).toBeVisible();
}

async function fillTextData(page: Page, data: userData): Promise<void> {
    const fields = ['firstName', 'lastName', 'email', 'mobile', 'currentAddress'] as const; // массив в литерал
    for (const field of fields) {
        await page.fill(formSelectors[field], data[field]);
    }
}

async function chooseOption(page: Page, optionKind: string, values: string[]): Promise<void> {
    for (const elem of values) {
        switch (optionKind) {
            case 'subject':
                await page.locator(formSelectors.subjectsInput).fill(elem);
                await page.locator(`div[id^="react-select"] div:has-text("${elem}")`).click();
                break;
            case 'gender':
                await page.locator(formSelectors.gender(elem)).click();
                break;
            case 'hobbies':
                await page.locator(formSelectors.hobbies(elem)).click();
                break;
        }
    }
}

async function chooseDateOfBirth(page: Page, birthDate: string) {
    let date = new Date(birthDate); // '2000-05-15'

    const day = String(date.getDate()).padStart(2, '0'); // "15"
    const month = date.getMonth().toString(); // 0–11 → "4"
    const year = date.getFullYear().toString(); // "2000"

    await page.click('#dateOfBirthInput');

    await page.selectOption('.react-datepicker__year-select', year);
    await page.selectOption('.react-datepicker__month-select', month);

    await page.click(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`);
}

async function selectLocation(page: Page, location: { state: string; city: string }): Promise<void> {
    await page.getByLabel(formSelectors.state).selectOption(location.state);
    await page.getByLabel(formSelectors.city).selectOption(location.city);
}

async function uploadImage(page: Page, imagePath: string): Promise<void> {
    await page.locator(formSelectors.picture).setInputFiles(validData.picture);
}

async function submitForm(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Submit' }).click();
}

test('fill in valid data', async ({ page }) => {
    await openPageDemoqa(page);

    await fillTextData(page, validData);
    await chooseOption(page, 'gender', ['Male']);
    await chooseOption(page, 'subject', ['Math', 'Physics', 'English']);
    await chooseOption(page, 'hobbies', ['Sports', 'Reading']);

    await chooseDateOfBirth(page, validData.birthDate);
    await uploadImage(page, validData.picture);
    await selectLocation(page, validData.stateCity);

    await submitForm(page);
});
