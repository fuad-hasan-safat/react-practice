import { useState } from "react";

export default function Login() {
 
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: ""
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = enteredValues.email.trim() !== '' && 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(enteredValues.email);

  const passwordIsInvalid = 
    enteredValues.password.trim() !== '' && 
    !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(enteredValues.password);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
    console.log(enteredValues);
  }

  function handleInputChange(event) {
    setEnteredValues({
      ...enteredValues,
      [event.target.name]: event.target.value
    });

    setDidEdit({
      ...didEdit,
      [event.target.name]: false
    });
  }

  function handleInputBlur(event) {
    setDidEdit({
      ...didEdit,
      [event.target.name]: true
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && didEdit.email && <p>Please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={enteredValues.password}
          />
          <div className="control-error">
            {passwordIsInvalid && didEdit.password && <p>Please enter a valid password</p>}
          </div>
          <div className="control-help">
            <p>Password must contain at least 8 characters, one uppercase letter, and one special character (!@#$%^&*)</p>
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
