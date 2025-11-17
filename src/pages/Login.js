import { useState } from "react";
import API from "../helper/api";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);

      alert("Login successful");
      window.location.href = "/tenant";
    } catch (err) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <br />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />{" "}
      <br /> <br />
      <button type="submit">Login</button>
    </form>
  );
};
