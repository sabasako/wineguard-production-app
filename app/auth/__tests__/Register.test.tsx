import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "@/app/auth/login";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { router } from "expo-router";

jest.mock("@/lib/supabase");
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe("Login Screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    expect(getByText("რეგისტრაცია")).toBeTruthy();
    expect(getByPlaceholderText("სახელი და გვარი")).toBeTruthy();
    expect(getByPlaceholderText("ელ-ფოსტა")).toBeTruthy();
    expect(getByPlaceholderText("პაროლი")).toBeTruthy();
    expect(getByPlaceholderText("გაიმეორეთ პაროლი")).toBeTruthy();
  });

  test("shows an error if any field is missing", async () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("რეგისტრაცია"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "გთხოვთ შეავსოთ ყველა ველი"
      );
    });
  });

  test("shows an error if email is invalid", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("გაიმეორეთ პაროლი"),
      "password123"
    );
    fireEvent.press(getByText("რეგისტრაცია"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა"
      );
    });
  });

  test("shows an error if passwords do not match", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("გაიმეორეთ პაროლი"),
      "differentpassword"
    );
    fireEvent.press(getByText("რეგისტრაცია"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "გთხოვთ შეიყვანოთ ერთიდაიგივე პაროლი!"
      );
    });
  });

  test("shows an error if password is less than 6 characters", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "123");
    fireEvent.changeText(getByPlaceholderText("გაიმეორეთ პაროლი"), "123");
    fireEvent.press(getByText("რეგისტრაცია"));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "პაროლი მინიმუმ 6 სიმბოლოსგან უნდა შედგებოდეს!"
      );
    });
  });

  test("calls Supabase sign-up with valid input", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { session: {} },
      error: null,
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("გაიმეორეთ პაროლი"),
      "password123"
    );
    fireEvent.press(getByText("რეგისტრაცია"));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "თქვენ წარმატებით დარეგისტრირდით!",
        "გთხოვთ გაიაროთ ავტორიზაცია აპლიკაციაში შესვლისთვის"
      );
    });
  });

  test("shows error if Supabase sign-up fails", async () => {
    const mockError = { status: 422, message: "User already registered" };
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: mockError,
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("გაიმეორეთ პაროლი"),
      "password123"
    );
    fireEvent.press(getByText("რეგისტრაცია"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "ასეთი მომხმარებელი უკვე არსებობს!"
      );
    });
  });

  test("shows loading indicator while signing up", async () => {
    (supabase.auth.signUp as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ data: { session: {} }, error: null }),
            1000
          )
        )
    );

    const { getByPlaceholderText, getByText, queryByTestId } = render(
      <Login />
    );
    fireEvent.changeText(getByPlaceholderText("სახელი და გვარი"), "Test User");
    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");
    fireEvent.changeText(
      getByPlaceholderText("გაიმეორეთ პაროლი"),
      "password123"
    );
    fireEvent.press(getByText("რეგისტრაცია"));

    expect(queryByTestId("activity-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(queryByTestId("activity-indicator")).toBeFalsy();
    });
  });
});
