import _Navbar from "@/components/_Navbar";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import DragDrop from "@/components/DragDrop";

function Register() {
  const [inputs, setInput] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("test failed message");
  const [img, setImg] = useState();
  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    let registerForm = { ...inputs, Profile_Picture: img };
    console.log(registerForm);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json(registerForm))
      .then((data) => setIsPosting(false) && router.push("/login"));
  };

  return (
    <Container className={styles.main}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input id="Email" name="Email" placeholder="Email" type="email" onChange={handleChange} />
          <Label for="Email">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Username" name="Username" placeholder="Username" type="text" onChange={handleChange} />
          <Label for="Username">Username</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Name" name="Name" placeholder="Name" type="text" onChange={handleChange} />
          <Label for="Name">Name</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Surname" name="Surname" placeholder="Surname" type="text" onChange={handleChange} />
          <Label for="Surname">Surname</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="Password" name="Password" placeholder="Password" type="password" onChange={handleChange} />
          <Label for="Password">Password</Label>
        </FormGroup>
        <Label>Upload Profile Picture</Label>
        <div style={{ margin: "-5px -45px", scale: ".7" }}>
          <DragDrop setImg={setImg} />
        </div>

        <div className="messageText">{message}</div>
        <Row>
          <Col>{!isPosting ? <Button>Submit</Button> : <Button disabled>Submit</Button>}</Col>
          <Col>
            <Link href="login">Login</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Register;
