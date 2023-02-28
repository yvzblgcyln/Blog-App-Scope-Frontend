import _Navbar from "@/components/_Navbar";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import RichText from "@/components/RichText";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function Add() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const router = useRouter();

  const [inputs, setInput] = useState({});
  const [post, setPost] = useState("");

  const handleChange = (e) => {
    e.target.value === "on"
      ? setInput({ ...inputs, [e.target.name]: e.target.id })
      : setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("Body", post);
    formData.append("Title", inputs.Title);
    formData.append("CategoryId", inputs.CategoryId);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addPost`, {
      method: "POST",
      headers: { "x-access-token": accessToken },
      body: formData,
    }).then((res) => res.json());
    res.MessageCode === "200" && router.push("/");
    console.log(res);
  };

  return (
    <div>
      <Container fluid="sm">
        <h2 style={{ margin: "30px" }}>Add post</h2>
        <Row>
          <Col xs="9">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
              <FormGroup floating>
                <Input id="Title" name="Title" placeholder="Title" type="text" onChange={handleChange} />
                <Label for="Title">Title</Label>
              </FormGroup>
              <RichText post={post} setPost={setPost} />
              {/* <textarea type="text" {...register("Body")} style={{ width: "100%", height: "250px" }} /> */}
              <Label>Upload Header Picture:</Label>
              {/* <div style={{ margin: "10px 0 20px 4px" }}>
                <DragDrop setImg={setImg} />
              </div> */}
              <input type="file" {...register("file")} style={{ marginBottom: "15px" }} />
              <Row>
                <Col>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </form>
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
