import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Token from "./Token";
import axios from "axios";
import {toast} from "react-toastify";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  //  call
  Token(token);

  const handleUserProfile = async () => {
    const response = await fetch("http://localhost:8080/api/user-details", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `jwt ${localStorage.getItem("token")}`,
      },
    });
    const dataResponse = await response.json();
    setData(dataResponse.data);
  };

  useEffect(() => {
    if (token) {
      handleUserProfile();
    }
  },[]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getall",{
        headers: {
        "content-type": "application/json",
        authorization: `jwt ${localStorage.getItem("token")}`,
      }})
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const deleteUser = (id) =>{
     axios.delete("http://localhost:8080/api/delete/"+id)
    .then((respones)=>{
      setUsers((prevUser)=> prevUser.filter((user)=> user._id !== id))
      toast.success(respones.data.msg, {position: 'top-center'})
    })
    .catch((error) =>{
      console.log(error);
    })
}
  return (
    <div className="h-screen-center2">
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <span className="navbar-text">
            <h5>User Management System</h5>
          </span>

          <span>
            <h3 className="user-name">{data?.name}</h3>
          </span>
        </div>

        {/* <p className="user-email">{data?.email}</p> */}
        <button className="logout-btn" onClick={handleLogOut}>
          Logout
        </button>
      </nav>
      <div className="userTable">
        <Link to={"/add"} className="addButton">
          Add User
        </Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>User name</th>
              <th>User Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td>{user.email}</td>
                  <td className="actionButtons">
                    <button onClick={() => deleteUser(user._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/edit/` + user._id}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
