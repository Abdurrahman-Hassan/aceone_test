import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const checkingExistingUser = async (email) => {
    setApiError("Loading...");

    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${email}`
      );
      const data = await response.json();
      if (data.total > 0) {
        setApiError("User Already Exists!");
        return true;
      }

      return false;
    } catch (error) {
      setApiError("There was an error while fetching!");
      console.log(error);
      return true;
    }
  };

  const addingUser = async (email, password) => {
    setApiError("Loading...");

    try {
      if (await checkingExistingUser(email)) {
        return;
      }

      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      setApiError("User Created Successfully.");
    } catch (error) {
      alert("There was an error while fetching!");
      console.log(error);
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setApiError("");
    const isEmailValid = (email) => {
      const emailRegex = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/i;
      return emailRegex.test(email);
    };
    if (email == "") {
      setEmailError("Email is required");
      return;
    } else if (!isEmailValid(email)) {
      setEmailError("Email address is not valid");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be 8 characters long");
      return;
    }
    addingUser(email, password);
  };

  return (
    <div className="loginForm">
      <div className="emailMainDiv">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div id="emailError" className="error">
          {emailError}
        </div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          minLength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="passwordError" className="error">
          {passwordError}
        </div>
      </div>
      <button type="submit" onClick={submitFunc}>
        Submit
      </button>
      <div className="apierrordiv">
        <div id="apiError" className="error">
          {apiError}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
