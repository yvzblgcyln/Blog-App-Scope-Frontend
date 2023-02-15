import _Navbar from "@/components/_Navbar";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import styles from "@/styles/login.module.css";
import Link from "next/link";

function Register() {
  const [inputs, setInput] = useState({});

  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <Container className={styles.main}>
      <h2>Register In</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input id="Email" name="email" placeholder="Email" type="email" onChange={handleChange} />
          <Label for="Email">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Username" name="username" placeholder="Username" type="username" onChange={handleChange} />
          <Label for="Username">Username</Label>
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
            <Link href="login">Login</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Register;
