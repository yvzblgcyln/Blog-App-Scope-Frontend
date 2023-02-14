import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import styles from "@/styles/post.module.css";

const blog = {
  user: "yavuz",
  title: "blog 1",
  post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.",
  category: "Art",
  img: "https://picsum.photos/300/200",
};

function Post({ direction, ...args }) {
  const isAdmin = true;
  const isCurrentUser = true;
  const [editMode, setEditMode] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [category, setCategory] = useState(blog.category);
  const [title, setTitle] = useState(blog.title);
  const [post, setPost] = useState(blog.post);

  const handlePost = () => {
    let updatedPost = { category, title, post };
    console.log(updatedPost);
    setEditMode(false);
  };
  const handleDelete = () => {
    console.log("deleted");
  };

  return (
    <div className={styles.post}>
      {!editMode ? (
        <Card
          body
          style={{
            width: "60%",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img alt="Sample" src={blog.img} />
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle tag="h5">{title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {category}
              </CardSubtitle>
            </div>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {blog.user}
            </CardSubtitle>
            <CardText>{post}</CardText>
            <div class="d-flex justify-content-between">
              {isCurrentUser && <Button onClick={() => setEditMode(true)}>Edit</Button>}
              <Button color="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card
          body
          style={{
            width: "60%",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img alt="Sample" src={blog.img} />
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle tag="h5">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                  <DropdownToggle caret>{category}</DropdownToggle>
                  <DropdownMenu {...args}>
                    <DropdownItem onClick={() => setCategory("Technology")}>Technology</DropdownItem>
                    <DropdownItem onClick={() => setCategory("Finance")}>Finance</DropdownItem>
                    <DropdownItem onClick={() => setCategory("Photo")}>Photo</DropdownItem>
                    <DropdownItem onClick={() => setCategory("Art")}>Art</DropdownItem>
                    <DropdownItem onClick={() => setCategory("Sport")}>Sport</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardSubtitle>
            </div>
            <div className="d-flex justify-content-between">
              <CardSubtitle className="m-2 text-muted" tag="h6">
                {blog.user}
              </CardSubtitle>
            </div>
            <CardText>
              <textarea className={styles.textarea} value={post} onChange={(e) => setPost(e.target.value)}></textarea>
            </CardText>
            <div className="d-flex justify-content-between">
              {isCurrentUser && <Button onClick={handlePost}> Post</Button>}
              {isAdmin && (
                <Button color="danger" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Post;
