import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      
      setMessage("Signup successful. Redirecting to dashboard...");
      window.location.href = `${DASHBOARD_URL}/?email=${encodeURIComponent(data.user.email)}`;

    } catch (error) {
      setMessage("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      
      setMessage("Login successful. Redirecting to dashboard...");
      window.location.href = `${DASHBOARD_URL}/?email=${encodeURIComponent(data.user.email)}`;
    } catch (error) {
      setMessage("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setMessage("");
            }}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setMessage("");
            }}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <div className="form">
            <h2>Login form</h2>

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
            />

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>

            {message && <p>{message}</p>}

            <p>
              Not a Member?{" "}
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                  setMessage("");
                }}
              >
                Signup now
              </a>
            </p>
          </div>
        ) : (
          <div className="form">
            <h2>Sign Up form</h2>

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />

            <button onClick={handleSignup} disabled={loading}>
              {loading ? "Please wait..." : "Sign Up"}
            </button>

            {message && <p>{message}</p>}

            <p>
              Already a Member?{" "}
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(true);
                  setMessage("");
                }}
              >
                Login here
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;


