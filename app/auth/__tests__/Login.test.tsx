import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "@/app/auth/login";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

// Mock Supabase and Expo Router
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
    expect(getByText("ავტორიზაცია")).toBeTruthy();
    expect(getByPlaceholderText("ელ-ფოსტა")).toBeTruthy();
    expect(getByPlaceholderText("პაროლი")).toBeTruthy();
  });

  test("shows an error if email or password is missing", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "");

    fireEvent.press(getByText("შესვლა"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "გთხოვთ შეავსოთ ყველა ველი"
      );
    });
  });

  test("shows an error if email is invalid", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password");

    fireEvent.press(getByText("შესვლა"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "გთხოვთ შეიყვანოთ რეალური ელ-ფოსტა"
      );
    });
  });

  test("calls Supabase sign-in on valid input", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");

    fireEvent.press(getByText("შესვლა"));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  test("shows error if login fails", async () => {
    const mockError = { status: 400, message: "Invalid credentials" };
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: mockError,
    });

    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "wrongpassword");

    fireEvent.press(getByText("შესვლა"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "შეცდომა",
        "ელ-ფოსტა ან პაროლი არასწორია"
      );
    });
  });

  test("navigates to the home screen on successful login", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");

    fireEvent.press(getByText("შესვლა"));

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/");
    });
  });

  test("shows loading indicator when logging in", async () => {
    const { getByText, getByPlaceholderText, queryByTestId } = render(
      <Login />
    );

    fireEvent.changeText(getByPlaceholderText("ელ-ფოსტა"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("პაროლი"), "password123");

    fireEvent.press(getByText("შესვლა"));

    expect(queryByTestId("activity-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(queryByTestId("activity-indicator")).toBeFalsy();
    });
  });
});
