import React, { useEffect, useState } from "react";
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
import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { removePost, updatePost } from "@/redux/postsSlice";

// const blog = {
//   UserId: "yavuz",
//   Title: "blog 1",
//   Body: "Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.Some quick example text to build on the card title and make up the bulk of the card‘s content.",
//   CategoryId: "Art",
//   Picture: "https://picsum.photos/300/200",
// };

// export const getStaticPaths = async () => {
//   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
//     method: "GET",
//     headers: { "x-access-token": accessToken },
//   }).then((res) => res.json());
//   console.log(data);
//   const paths = data.map((path) => {
//     return { params: { id: path.id.toString() } };
//   });
//   return { paths, fallback: false };
// };

//export const getStaticProps = async (context) => {
// const id = context.params.id;
// const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
//   method: "GET",
//   headers: { "x-access-token": accessToken },
// }).then((res) => res.json());
// console.log(res);
// return {
//   props: { fetchedPost: data },
// };
// };

function Post({ fetchedPost, direction, ...args }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const accessToken = useSelector((state) => state.user.accessToken);
  const isAdmin = true;
  const isCurrentUser = true;
  const [editMode, setEditMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blog, setBlog] = useState();
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { id } = router.query;
    const data = await fetch(`http://127.0.0.1:5000/post/${id}`, {
      method: "GET",
      headers: { "x-access-token": accessToken },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("error", error);
      });
    setBlog(data.Data[0]);
    console.log(blog);
    // setCategory(blog.CategoryId);
    // setTitle(blog.Title);
    // setPost(blog.Body);
  };

  const handlePost = () => {
    let updatedPost = { category, title, post };
    dispatch(updatePost(id, updatedPost));
    console.log(updatedPost);
    setEditMode(false);
  };

  const handleDelete = () => {
    console.log("deleted");
    dispatch(removePost(id));
    router.push("/");
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={styles.post}>
      {!editMode ? (
        <PostCard blog={blog} isHome={false} editMode={editMode} setEditMode={setEditMode} />
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
          <img alt="Sample" src={blog.Picture} className="postImg" />
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle tag="h5">
                <input type="text" value={blog.Title} onChange={(e) => setTitle(e.target.value)} />
              </CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                  <DropdownToggle caret>{category}</DropdownToggle>
                  <DropdownMenu {...args}>
                    <DropdownItem onClick={() => setCategory(1)}>Technology</DropdownItem>
                    <DropdownItem onClick={() => setCategory(2)}>Finance</DropdownItem>
                    <DropdownItem onClick={() => setCategory(3)}>Photo</DropdownItem>
                    <DropdownItem onClick={() => setCategory(4)}>Art</DropdownItem>
                    <DropdownItem onClick={() => setCategory(5)}>Sport</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardSubtitle>
            </div>
            <div className="d-flex justify-content-between">
              <CardSubtitle className="m-2 text-muted" tag="h6">
                {blog.UserId}
              </CardSubtitle>
            </div>
            <CardText>
              <textarea
                className={styles.textarea}
                value={blog.Body}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
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
