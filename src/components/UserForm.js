import React, { useEffect, useState, useRef } from "react";

function UserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const firstRun = useRef(true);

  // Form Validation
  useEffect(() => {
    if (firstRun.current) {
      // Don't run validation on first render
      firstRun.current = false;
      return;
    }

    let isFormValid = true;

    if (username.length <= 8) {
      isFormValid = false;
      if (username.length === 0) {
        setErrors((errors) => ({ ...errors, username: null }));
      } else {
        setErrors((errors) => ({
          ...errors,
          username: "Username must be greater than 8 charaters."
        }));
      }
    } else {
      setErrors((errors) => ({ ...errors, username: null }));
      isFormValid = isFormValid ? true : false;
    }

    if (password.length <= 8) {
      isFormValid = false;
      if (password.length === 0) {
        setErrors((errors) => ({ ...errors, password: null }));
      } else {
        setErrors((errors) => ({
          ...errors,
          password: "Password must be greater than 8 charaters."
        }));
      }
    } else {
      setErrors((errors) => ({ ...errors, password: null }));
      isFormValid = isFormValid ? true : false;
    }

    if (confirmPassword !== password) {
      isFormValid = false;
      if (confirmPassword.length === 0) {
        setErrors((errors) => ({ ...errors, confirmPassword: null }));
      } else {
        setErrors((errors) => ({
          ...errors,
          confirmPassword: "Passwords do not match."
        }));
      }
    } else {
      setErrors((errors) => ({ ...errors, confirmPassword: null }));
      isFormValid = isFormValid ? true : false;
    }

    isFormValid ? setIsRegisterEnabled(true) : setIsRegisterEnabled(false);
  }, [username, password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">Form Validation</header>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            {errors.username ? <div>{errors.username}</div> : null}
            <label htmlFor="username" value={username}>
              Username
            </label>
            <input
              id="username"
              type="text"
              onBlur={(event) => setUsername(event.target.value)}
            ></input>
          </div>

          <div>
            {errors.password ? <div>{errors.password}</div> : null}
            <label htmlFor="password" value={password}>
              Password
            </label>
            <input
              id="password"
              type="password"
              onBlur={(event) => setPassword(event.target.value)}
            ></input>
          </div>

          <div>
            {errors.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <label htmlFor="confirm-password" value={confirmPassword}>
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></input>
          </div>

          <button disabled={!isRegisterEnabled}>Register</button>
        </form>
      </section>
    </div>
  );
}

export default UserForm;
