export type Gender = "Male" | "Female" | "Other";
export type Hobby = "Sports" | "Reading" | "Music";

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

export const validData: userData = {
  firstName: "Alex",
  lastName: "Ivanov",
  email: "ivanov@mail.com",
  gender: "Male",
  mobile: "2912345678",
  birthDate: "2000-05-15",
  subjects: ["Math", "Physics", "English"],
  hobbies: ["Sports", "Reading"],
  picture: "image.jpg",
  currentAddress: "ул. Ленина, д. 10, Минск",
  stateCity: {
    state: "NCR",
    city: "Delhi",
  },
};

export const TestDataInvalEmail: userData = {
  firstName: "Ivan",
  lastName: "Sidorov",
  gender: "Male",
  email: "ivan.sidorov", // неверный формат email
  mobile: "9876543210",
  birthDate: "1985-03-20",
  subjects: ["English", "Economics"],
  hobbies: ["Sports", "Music"],
  picture: "image.jpg",
  currentAddress: "ул. Пушкина, д. 12, Москва",
  stateCity: {
    state: "NCR",
    city: "Delhi",
  },
};

export const formSelectors = {
  firstName: "#firstName",
  lastName: "#lastName",
  email: "#userEmail",
  mobile: "#userNumber",
  currentAddress: "#currentAddress",
  gender: (value: string) => `input[name="gender"][value="${value}"]`,
  birthDate: "#dateOfBirthInput",
  subjectsInput: "#subjectsInput",
  hobbies: (label: string) => `label:has-text("${label}")`,
  picture: "#uploadPicture",
  state: "#state",
  city: "#city",
};
