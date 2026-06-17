import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (email) {
      localStorage.setItem("zerodhaUser", JSON.stringify({ email }));
      window.history.replaceState({}, document.title, "/");
      return;
    }

    const user = localStorage.getItem("zerodhaUser");

    if (!user) {
      window.location.href = "http://localhost:3000/signup";
    }
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
}

export default Home;


