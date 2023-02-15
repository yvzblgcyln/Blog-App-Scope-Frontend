import _Navbar from "@/components/_Navbar";
import DragDrop from "@/components/DragDrop";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import RichText from "@/components/RichText";

function Add() {
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({});
  const [post, setPost] = useState("");
  const handleChange = (e) => {
    e.target.value === "on"
      ? setInput({ ...inputs, [e.target.name]: e.target.id })
      : setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = { ...inputs, Post: post };
    console.log(a);
  };

  return (
    <div>
      <Container fluid="sm">
        <h2 style={{ margin: "30px" }}>Add post</h2>
        <Row>
          <Col xs="9">
            <Form onSubmit={handleSubmit}>
              <FormGroup floating>
                <Input id="Title" name="Title" placeholder="Title" type="text" onChange={handleChange} />
                <Label for="Title">Title</Label>
              </FormGroup>
              {/* <textarea
                className="p-2"
                style={{ width: "100%", height: "250px" }}
                name="Post"
                placeholder="Post"
                onChange={handleChange}
              /> */}
              <RichText post={post} setPost={setPost} />
              <DragDrop />
              <Row>
                <Col>
                  <Button>Submit</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col xs="3">
            <h3>Category</h3>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="Cat" id="Technology" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Technology">
                Technology
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="Cat" id="Finance" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Finance">
                Finance
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="Cat" id="Photo" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Photo">
                Photo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="Cat" id="Art" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Art">
                Art
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="Cat" id="Sport" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Sport">
                Sport
              </label>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Add;
