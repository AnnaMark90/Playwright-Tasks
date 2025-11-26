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
  firstname: 'Ivan',
  lastname: 'Ivanov',
  postcode: 110099,
};