import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

export default function Login() {
  let { isLogin, setIsLogin } = useContext(MyContext);
  let userN = useRef();

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    let { email, password } = e.target;
    let verify_user = {
      email: email.value,
      password: password.value,
    };

    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(verify_user),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        navigate("/courses");
      });
  };

  return (
    <div className="m-auto w-25">
      <form
        onSubmit={(e) => {
          login(e);
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
          Login
        </button>
      </form>
    </div>
  );
}
