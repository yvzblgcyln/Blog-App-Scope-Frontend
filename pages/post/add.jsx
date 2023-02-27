import _Navbar from "@/components/_Navbar";
import DragDrop from "@/components/DragDrop";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import RichText from "@/components/RichText";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "@/redux/postsSlice";
import { useRouter } from "next/router";

function Add() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputs, setInput] = useState({});
  const [post, setPost] = useState("");
  const [img, setImg] = useState();

  const handleChange = (e) => {
    e.target.value === "on"
      ? setInput({ ...inputs, [e.target.name]: e.target.id })
      : setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    let postForm = { ...inputs, Body: post, file: img };
    console.log(postForm);
    formData.append('data', JSON.stringify(postForm))

    dispatch(addPost(postForm));

     fetch(`${process.env.NEXT_PUBLIC_API_URL}/addPost`, {
       method: "POST",
       headers: {
         'Content-Type': 'multipart/form-data',
         "x-access-token": accessToken,
       },
       body: JSON.stringify(formData),
     }).then((res) => res.json());
    //.then((data) => router.push("/"));
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
              <RichText post={post} setPost={setPost} />
              <span>Upload an header image</span>
              <div style={{ margin: "10px 0 20px 4px" }}>
                <DragDrop setImg={setImg} />
              </div>
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
              <input className="form-check-input" type="radio" name="CategoryId" id="1" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Technology">
                Technology
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="CategoryId" id="2" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Finance">
                Finance
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="CategoryId" id="3" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Photo">
                Photo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="CategoryId" id="4" onChange={handleChange} />
              <label className="form-check-label" htmlFor="Art">
                Art
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="CategoryId" id="5" onChange={handleChange} />
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
