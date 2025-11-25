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

export const validData: userData = {
  firstName: "Alex",
  lastName: "Ivanov",
  email: "ivanov@mail.com",
  gender: "Male",
  mobile: "2912345678",
  birthDate: "2000-05-15",
  subjects: ["Math", "Physics", "English"],
  hobbies: ["Sports", "Reading"],
  picture: "user1.jpg",
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
  picture: "user4.jpg",
  currentAddress: "ул. Пушкина, д. 12, Москва",
  stateCity: {
    state: "NCR",
    city: "Delhi",
  },
};

export const DataWithoutObl: userData = {
  firstName: "Maria",
  lastName: "Petrova",
  email: "petrova@mail.com",
  gender: "Female",
  mobile: "2923456789",
  birthDate: "1995-07-21",
  subjects: ["Biology", "Chemistry"],
  hobbies: ["Music"],
  picture: "user2.jpg",
  currentAddress: "ул. Советская, д. 15, Москва",
  stateCity: {
    state: "NCR",
    city: "Delhi",
  },
};

export const DataObligatory: userData = {
  firstName: "Dmitry",
  lastName: "Smirnov",
  email: "smirnov@mail.com",
  gender: "Male",
  mobile: "2934567890",
  birthDate: "1988-11-10",
  subjects: ["History", "English"],
  hobbies: ["Sports", "Reading"],
  picture: "user3.jpg",
  currentAddress: "пр. Мира, д. 10, Санкт-Петербург",
  stateCity: {
    state: "Uttar Pradesh",
    city: "Agra",
  },
};

export const DataWithoutName: userData = {
  firstName: "Elena",
  lastName: "Kuznetsova",
  email: "kuznetsova@mail.com",
  gender: "Female",
  mobile: "2945678901",
  birthDate: "2002-02-05",
  subjects: ["Math", "Physics", "Computer Science"],
  hobbies: ["Reading", "Sports"],
  picture: "user5.jpg",
  currentAddress: "ул. Пушкина, д. 22, Новосибирск",
  stateCity: {
    state: "NCR",
    city: "Delhi",
  },
};
