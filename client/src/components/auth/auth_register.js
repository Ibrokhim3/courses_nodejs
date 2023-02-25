import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let userN = useRef();

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    let { username, email, password, gender } = e.target;
    let new_user = {
      username: userN.current.value,
      email: email.value,
      gender: gender.value,
      password: password.value,
    };

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: JSON.stringify(new_user),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        navigate("/login");
      });
  };

  return (
    <div className="m-auto w-25">
      <form
        onSubmit={(e) => {
          register(e);
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            required
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            required
            ref={userN}
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <label htmlFor="female">Female</label>
          <input
            required
            className="ml-2"
            type="radio"
            name="gender"
            id="female"
            value="female"
          />
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="male" value="male" />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            id="pwd"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
