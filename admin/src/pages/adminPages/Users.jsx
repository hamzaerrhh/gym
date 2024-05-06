import axios from "axios";
import { useEffect, useState } from "react";
const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/user", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <div>the users</div>;
};
export default Users;
