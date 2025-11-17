import { useState } from "react";
import API from "../helper/api";

export const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "**Username is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "**Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "**Email is invalid";
    }
    if (!form.password.trim()) {
      newErrors.password = "**Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "**Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted:", form);
      try {
        const { data } = await API.post("/auth/register", form);
        if (data?.statusCode === 200) {
          console.log("data: ", data);
          alert("Registered successfully!");
          setForm({ name: "", email: "", password: "" });
        } else {
          alert("User Already Exist!");
        }
      } catch (err) {
        console.log("err: ", err);
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />{" "}
      {errors.name && (
        <p className="error" style={{ color: "red" }}>
          {errors.name}
        </p>
      )}
      <br /> <br />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />{" "}
      <br /> <br />
      <input
        name="password"
        placeholder="Password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />{" "}
      <br /> <br />
      <button type="submit">Register</button>
    </form>
  );
};
