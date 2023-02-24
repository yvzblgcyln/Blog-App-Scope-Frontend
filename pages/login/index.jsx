import _Navbar from "@/components/_Navbar";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputs, setInput] = useState({});

  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Cookies.set("user", inputs.username);
    dispatch(setUser(Cookies.get("user")));
    const encodedString = "basic " + btoa(inputs.username + ":" + inputs.password);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      headers: {
        Authorization: encodedString,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(setAccessToken(data.Data)))
      .catch((error) => {
        console.log("error", error);
      });
    router.push("/");
  };

  return (
    <Container className={styles.main}>
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input id="Username" name="username" placeholder="Username" type="text" onChange={handleChange} />
          <Label for="Username">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Password" name="password" placeholder="Password" type="password" onChange={handleChange} />
          <Label for="Password">Password</Label>
        </FormGroup>
        <Row>
          <Col>
            <Button>Submit</Button>
          </Col>
          <Col>
            <Link href="register">Register</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
