import { useEffect, useState } from "react";
import API from "../helper/api";
import { Link } from "react-router-dom";

export const Tenant = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const authFlow = async () => {
      try {
        const authData = await API.get("/auth/protected");
        console.log("authData: ", authData.data);
        setData(authData.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    authFlow();
  }, []);
  return (
    <>
      {data?.statusCode !== 401 ? (
        <>
          <h1>Welcome to Tenant Management System</h1>
          <h4>Create Tenant Here</h4> <br />
          Click here to create tenant
          <Link to="/create-tenant">About Us</Link> <br />
          <Link to="/get-tenants">List of Tenants</Link>
        </>
      ) : (
        <>
          <p>{data.message}</p>
          <Link to="/login">Login Here</Link> <br />
        </>
      )}
    </>
  );
};
