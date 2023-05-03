//Initial useEffect dependencies theory

/* In App.js saw useEffect() with no dependencies, often you need dependencies because 
you don't just want to run this effect function once when the app starts up, but indeed, 
after every component re-evaluation, if a certain dependency changed. */

/* An example can be found in the login component. Login component = components -> render 
the form. */
/* validation built into the form */

import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  /* In email and password change handler, we could utilise useEffect to have one place 
  where we mark the form as valid or invalid with one logic - which should trigger, whevever either 
  the email or password changed. Thats where we will need an extra dependency. */

  /* So after state definitions, call useEffect pass the first function for email change handler to 
  it and have our array of dependencies again as the second argument of the useEffect() function. */

  /* We need this to run more than once -> not just when the ocmponent was rendered for the first time.
  We want to re-evaluate and rerun this form validation state setting function for every keystroke in 
  email and password change handler. */

  /* Rule for dependencies -> you add as dependencies what you're using in side effect function. Don't
  want to add the parentheses after the names of the functions, but instead you add names -> 
  pointer at functions, so you're essentially adding the functions themselves, NOT the results of said
  functions. */

  /* The function below tells react after every login component function execution, it'll re run this 
  useEffect function but only if either enteredEmail or enteredPassword changed in the 
  last re render cycle. */

  /* If neither of the 2 changed, the effect function would not re run. */
  useEffect(() => {
    /* Sometimes need to use useEffect() for some cleanup work. Here we are executing this function 
    (setFormIsValid) on every keystroke. */
    /* We are updating state -> which might not be ideal, because it triggers another function 
    component execution, and that React again needs to check whether it needs to change soemthing 
    in the DOM. Maybe not something we want to do for every keystroke? */
    /* Instead, might want to collect a certain amount of keystrokes, or simply wait for a pause of a 
    certain time duration after a keystroke. Logic of waiting for a pause? User seems to be done -> 
    lets see if its valid. */
    /* This is a technique known as DEBOUNCING. We want to debounce the user input - we want to make 
    sure we're not doing something with it on every keystroke, but once the user has made a pause 
    during typing. */
    /* With useEffect() this is easy -> use setTimeout() */
    setTimeout();
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, [enteredEmail, enteredPassword]);

  /* email validation for every keystroke on the email field */
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  /* password validation for every keystroke on the password */
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  /* validateEmailHandler and validatePasswordHandler - set email and password as valid whenever 
  the inputs blur -> so whenever they loose focus. So that -> they are also makred as invlaid if I
  click into email input box enter nothing for example and click somewhere else. */
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
