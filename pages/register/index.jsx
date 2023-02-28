import _Navbar from "@/components/_Navbar";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import DragDrop from "@/components/DragDrop";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { useRouter } from "next/router";

function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [inputs, setInput] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState();

  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("Email", inputs.Email);
    formData.append("Username", inputs.Username);
    formData.append("Name", inputs.Name);
    formData.append("Surname", inputs.Surname);
    formData.append("Password", inputs.Password);

    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    res.Success ? router.push("/login") : setMessage(res.Message);
  };
  return (
    <Container className={styles.main}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {/* <div style={{ margin: "-5px -45px", scale: ".7" }}>
          <FileUploader type="file" {...register("file")} />
        </div> */}
        <input type="file" {...register("file")} />
        {message && <div className="messageText">{message}</div>}
        <Row className="m-4">
          <Col>{!isPosting ? <Button>Submit</Button> : <Button disabled>Submit</Button>}</Col>
          {/* <Col>{<Button>Submit</Button>}</Col> */}
          <Col>
            <Link href="login">Login</Link>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default Register;
