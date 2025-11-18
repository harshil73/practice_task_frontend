import { useState } from "react";
import "../style/Register.css";
import API from "../helper/api";

export const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "**Username is required";
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
      try {
        const { data } = await API.post("/auth/register", form);
        if (data?.statusCode === 200) {
          alert("Registered successfully!");
          setForm({ name: "", email: "", password: "" });
        } else {
          alert("User Already Exist!");
        }
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
