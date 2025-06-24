import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../../Components/DataProvider/DataProvider";
import { auth } from "../../../Utility/firebase";
import { Type } from "../../../Utility/action.type";

import logo from "../../../assets/image/amazonLog.png";
import classes from "./SignUp.module.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  const authHandler = async (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.name;

    if (formAction === "signin") {
      setLoading((prev) => ({ ...prev, signIn: true }));

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading((prev) => ({ ...prev, signIn: false }));
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signIn: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, signUp: true }));

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading((prev) => ({ ...prev, signUp: false }));
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signUp: false }));
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src={logo} alt="Amazon Logo" />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            name="signin"
            className={classes.login_signInBtn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
          <button
            type="submit"
            name="signup"
            className={classes.login__registerBtn}
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default SignUp;
