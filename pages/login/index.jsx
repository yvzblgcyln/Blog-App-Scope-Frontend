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
    Cookies.set("user", inputs.email);
    dispatch(setUser(Cookies.get("user")));
    router.push("/");
    console.log(inputs);

    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   body: JSON.stringify(),
    // })
    //   .then((res) => res.json(inputs))
    //   .then((data) => router.push("/"));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`)
      .then((res) => res.json())
      .then((data) => console.log(data) && dispatch(setAccessToken(data.Data)))
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Container className={styles.main}>
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input id="Email" name="email" placeholder="Email" type="email" onChange={handleChange} />
          <Label for="Email">Email</Label>
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
