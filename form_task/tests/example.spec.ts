import { test, expect, type Page} from '@playwright/test';
import type { userData } from '../types/types';
import { formSelectors } from '../types/types';

const validData: userData = {
  firstName: 'Alex',
  secondName: 'Ivanov',
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
  }
};

async function openPageDemoqa (page: Page): Promise<void>{ 
  await page.goto('https://demoqa.com/text-box',  { timeout: 60000 });
  await expect(page.getByRole('heading', { name: 'Practice Form' })).toBeVisible();
}

async function submitForm(page: Page): Promise<void>{
  await page.getByRole('button', { name: 'Submit' }).click();
}

async function fillTheData(page: Page, data: userData) {
  const fields = ['firstName', 'secondName', 'email', 'mobile', 'currentAddress'] as const; // массив в литерал
  for (const field of fields) { 
    await page.fill(formSelectors[field], data[field]);
  }
  
}

test('fill in valid data', async ({ page }) => {
  await openPageDemoqa(page);
  await fillTheData(page, validData);
  await submitForm(page);
});