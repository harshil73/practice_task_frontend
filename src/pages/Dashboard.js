import { useEffect, useState } from "react";
import API from "../helper/api";

export default function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    API.get("/auth/protected").then((res) => setData(res.data.message));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}
