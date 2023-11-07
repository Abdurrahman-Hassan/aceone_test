import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

it("error message for an invalid email", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(emailInput, { target: { value: "somemail@dd,c" } });
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  fireEvent.click(submitButton);

  expect(screen.getByText("Email address is not valid")).toBeInTheDocument();
});

it("error message for an empty email", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(emailInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  fireEvent.click(submitButton);

  expect(screen.getByText("Email is required")).toBeInTheDocument();
});

it("error message for a short password", () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(emailInput, { target: { value: "someone@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "12345" } });

  fireEvent.click(submitButton);

  expect(
    screen.getByText("Password must be 8 characters long")
  ).toBeInTheDocument();
});

it("should handle a successful API call", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(emailInput, { target: { value: "someone@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "12345789" } });

  fireEvent.click(submitButton);

  await waitFor(
    () => {
      expect(
        screen.getByText("User Created Successfully.")
      ).toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});

it("error message for user already exist.", async () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(emailInput, {
    target: { value: "dpettegre6@columbia.edu" },
  });
  fireEvent.change(passwordInput, { target: { value: "12345789" } });

  fireEvent.click(submitButton);

  await waitFor(
    () => {
      expect(screen.getByText("User Already Exists!")).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});
