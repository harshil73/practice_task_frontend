import { useState } from "react";
import API from "../helper/api";

export const CreateTenant = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    industry: "",
    status: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", form);
    try {
      const { data } = await API.post("/tenant/create", form);
      console.log("data: ", data);
      if (data?.statusCode === 201) {
        console.log("data: ", data);
        alert("Tenant Created Successfully!");
        setForm({ name: "", email: "", industry: "", status: "" });
      } else {
        alert("Tenant Already Exist!");
      }
    } catch (err) {
      console.log("err: ", err);
      alert(err.response?.data?.message || "Create Tenant failed");
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
      <br /> <br />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />{" "}
      <br /> <br />
      <input
        name="industry"
        placeholder="industry"
        value={form.industry}
        type="industry"
        onChange={handleChange}
      />{" "}
      <br /> <br />
      <label for="status">Choose a status: </label>
      <select name="status" id="status" onChange={handleChange}>
        <option value="active">Active</option>
        <option value="nonactive">non Active</option>
        <option value="else">else</option>
      </select>
      <br /> <br />
      <button type="submit">Create</button>
    </form>
  );
};
