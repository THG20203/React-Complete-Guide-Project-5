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

  //USEREDUCER
  /* useReducer is another built in hook and it will help us with state management. Bit like useState,
  but with more capabilities -> especially useful for more ocmplex state. */
  /* Sometimes have more complex state -> for example multiple States that kind of belong together.
  use cases for useReducer -> if its got multiple states, multiple ways of changing it or dependencies 
  to other states. */
  /* In the cases useState() then often becomes hard or error prone to use - it's easy to write bad, 
  inefficient or buggy code in such scenarios */

  //USEEFECT
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
    /* With useEffect() this is easy -> use setTimeout() -> function built into the browser to wait for 500 
    milliseconds until I execute a function. 500 milliseconds is the second parameter, first parameter
    is the function. In the function (parameter 1) might want to check form validity */

    /* Now we can use the fact setTimeout() actually returns a handler lets say, or actually, an identifier 
    for the timer that was set.  */
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    /* Clean up function -> anonymous arrow function created below. This will run as a clean up process 
    before useEffect executes this function next time. */
    /* Whenever the useEffect function above runs, before it runs, except for the very first time when 
    it runs, this clean up function will run. */
    /* In addition, the clean up function will run whenever the component I'm specifying the effect in 
    unmounts from the DOM. So whenever the component is re used.  */
    /* So clean up function runs before every new side effect function execution and before the 
    component is removed. It also does not run before the FIRST side effect function execution. */
    return () => {
      /* Can use identifier to clear the timer, with the built in clearTimeOut function, which is built into 
      the browser. */
      /* Want to run it in my cleanup function, running clearTimeout and passing the identifier of 
      this timeout to it. This makes sure that whenever the cleanup function runs, I clear the timeout that 
      was set before this cleanup function ran - so in the last side effect function execution, so that 
      when the next side effect execution is due, we are able to set a new timer. */
      /* So we clear the last timer before we set a new one. */
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
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
