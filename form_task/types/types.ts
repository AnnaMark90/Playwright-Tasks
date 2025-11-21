export type Gender = 'Male' | 'Female' | 'Other';
export type Hobby = 'Sports' | 'Reading' | 'Music';

export interface userData {
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    mobile: string;
    birthDate: string; // формат YYYY-MM-DD
    subjects: string[];
    hobbies: Hobby[];
    picture: string; // путь к локальному файлу
    currentAddress: string;
    stateCity: {
        state: string;
        city: string;
    };
}

export const formSelectors = {
    firstName: '#firstName',
    lastName: '#lastName',
    email: '#userEmail',
    mobile: '#userNumber',
    currentAddress: '#currentAddress',
    gender: (value: string) => `input[name="gender"][value="${value}"]`,
    birthDate: '#dateOfBirthInput',
    subjectsInput: '#subjectsInput',
    hobbies: (label: string) => `label:has-text("${label}")`,
    picture: '#uploadPicture',
    state: '#state',
    city: '#city',
};
