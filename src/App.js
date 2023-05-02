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

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyway

    /* STORING THE DATA. Here in the loginHandler, we setLoggedIn to true.
    Thats where I want to store that piece of information in the browser storage */
    /* Browser = multiple storages we can use, most common = cookies or local storage. */
    /* LocalStorage is mechanism built in the browser, independent of react. When applying 
    it, localStorage = a global object which is available in the browser. */
    localStorage.setItem();
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
