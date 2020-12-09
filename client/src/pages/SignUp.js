import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import DemoPageWrap from "../components/DemoPageWrap";
import Form from "../components/Form";
import Return from "../components/Return";
import { BiLeftArrow } from "react-icons/bi";

function SignUp(props) {
  const [values, setvalues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const addvalues = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const submitData = (e) => {
    e.preventDefault();
    axios
      .post("/signup", values)
      .then((res) => {
        console.log(res.data, "sucessful");
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Return>
        <Link to="/">
          <BiLeftArrow />
        </Link>
      </Return>
      <DemoPageWrap>
        <h2>Sign Up to enjoy awesome features</h2>
        <Form onSubmit={submitData}>
          <div>
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={addvalues}
            />
          </div>
          <div>
            <label htmlFor="emil">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={addvalues}
            />
          </div>
          <div>
            <label htmlFor="password">Pasword</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={addvalues}
            />
          </div>
          <Button>SignUp</Button>
        </Form>
      </DemoPageWrap>
    </div>
  );
}

export default SignUp;
