import React, { useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* Where can we utilise USE EFFECT? Would be good to store data somewhere, where it persists 
  the reload, even better than that -> we want to make sure whenever this app does start, 
  we check if that data persisted. Log user in automatically -> so user doesn't need to re 
  enter details. */

  // AFTER we call USE STATE
  /* When app restarts, the app component function runs again, so we could reach out to 
  localStorage, call getItem(), and search for isLoggedIn and it'll return the items stored there. */
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  /* check if storedUserLoggedInInformation is equal to 1 */
  if (storedUserLoggedInInformation === "1") {
    /* if it is equal to 1, could call setIsLoggedIn and set as to true. With this, 
    set the user to login, even without the loginHandler function being triggered, because
    we know that the user is logged in. */
    setIsLoggedIn(true);
  }

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyway

    /* STORING THE DATA. Here in the loginHandler, we setLoggedIn to true.
    Thats where I want to store that piece of information in the browser storage */
    /* Browser = multiple storages we can use, most common = cookies or local storage. */
    /* LocalStorage is mechanism built in the browser, independent of react. When applying 
    it, localStorage = a global object which is available in the browser. */
    /* Local storage -> application of devTools -> will show key value pair. */

    /* Give setItem() any identifier of our choice, like 'isLoggedIn' -> thats up to me. It 
    should be a string though. The second argument should also be a string which I store. 
    For example could be 1 to signal that the user isLoggedIn, or 0 could stand for not logged
    in. */
    /* We can add in the localStorage object with setItem function within the loginHandler function,
    because its a function that executes only when the user clicks the button which is exactly 
    when we want to store something. */

    /* If page refreshed etc, want to check if in localStorage we still have key value pair?
    When App restarts, the app components runs again. */
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
