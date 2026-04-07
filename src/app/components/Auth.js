import React, { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import Image from "next/image";
import google from "../assets/google.png";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Auth({ onClose, mode, setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // Sign Up function
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Login function
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      setError("");
      router.push("/for-you");
    } catch (error) {
      setError(error.message);
    }
  };

  // Send password reset email function
  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      setMode("login");
    } catch (err) {
      console.log(err);
    }
  };

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="auth__wrapper">
      <div className="auth">
        <div className="auth__content">
          {/* TITLE */}
          <div className="auth__title">
            {mode === "login" && "Log in to Summarist"}
            {mode === "signup" && "Sign up to Summarist"}
            {mode === "forgot" && "Reset your password"}
          </div>
          {/* LOGIN */}
          {mode === "login" && (
            <>
              <button
                className="btn guest__btn--wrapper"
                onClick={() => router.push("/for-you")}
              >
                <figure className="guest__icon--mask auth__icon--mask">
                  <IoPersonSharp />
                </figure>
                <div>Login as a Guest</div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
            </>
          )}
          {mode !== "forgot" && (
            <>
              <button
                className="btn google__btn--wrapper"
                onClick={async () => {
                  try {
                    await signInWithPopup(auth, googleProvider);
                    router.push("/for-you");
                  } catch (error) {
                    setError(error.message);
                  }
                }}
              >
                <figure className="google__icon--mask auth__icon--mask">
                  <Image src={google} alt="google" />
                </figure>
                <div>
                  {mode === "login"
                    ? "Login with Google"
                    : "Sign up with Google"}
                </div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
            </>
          )}
          {/* EMAIL & PASSWORD */}
          <form
            className="auth__main--form"
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "login") handleLogin();
              if (mode === "signup") handleSignUp();
              if (mode === "forgot") handleReset();
            }}
          >
            <input
              className="auth__main--input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {mode !== "forgot" && (
              <input
                className="auth__main--input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}
            <button className="btn" type="submit">
              <span>
                {mode === "login" && "Log in"}
                {mode === "signup" && "Sign up"}
                {mode === "forgot" && "Send reset password link"}
              </span>
            </button>
          </form>
        </div>
        {/* FOOTER LINKS */}
        {mode === "login" && (
          <>
            <div
              className="auth__forgot--password"
              onClick={() => setMode("forgot")}
            >
              Forgot your password?
            </div>
            <button
              className="auth__switch--btn"
              onClick={() => setMode("signup")}
            >
              Don't have an account?
            </button>
          </>
        )}
        {mode === "signup" && (
          <>
            <button
              className="auth__switch--btn"
              onClick={() => setMode("login")}
            >
              Already have an account?
            </button>
          </>
        )}
        {mode === "forgot" && (
          <>
            <button
              className="auth__switch--btn"
              onClick={() => setMode("login")}
            >
              Go to login
            </button>
          </>
        )}
        {/* CLOSE BUTTON */}
        <div className="auth__close--btn" onClick={onClose}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
