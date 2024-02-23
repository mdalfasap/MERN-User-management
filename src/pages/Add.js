import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Add = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
 
    const response = await fetch("http://localhost:8080/api/Add", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: `jwt ${localStorage.getItem("token")}`,
        },
      
      body: JSON.stringify(user),
    });
    const dataRespnse = await response.json();

    console.log("dataRespnse", dataRespnse);

    if (dataRespnse.error) {
      toast.error(dataRespnse.msg,{position: 'top-center'});
    }
    

    if (dataRespnse.success) {
      toast.success(dataRespnse.msg,{position: 'top-center'});
      setUser({
        fname: "",
        lname: "",
        email: "",
        password: "",
      });
      navigate("/user-profile");
    }
  };

  return (
    <div className="addUser">
      <Link to="/user-profile">Back</Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="password"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
