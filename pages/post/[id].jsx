import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
} from "reactstrap";
import styles from "@/styles/post.module.css";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "@/redux/postsSlice";
import RichText from "@/components/RichText";
import { useForm } from "react-hook-form";

// export async function getStaticPaths() {
//   const accessToken = useSelector((state) => state.user.accessToken);

//   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
//     method: "GET",
//     headers: { "x-access-token": accessToken },
//   }).then((res) => res.json());
//   console.log(data);
//   const paths = data.map((path) => {
//     return { params: { id: path.id.toString() } };
//   });
//   return { paths, fallback: false };
// }

// export async function getStaticProps(context) {
//   const accessToken = useSelector((state) => state.user.accessToken);

//   const id = context.params.id;
//   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, {
//     method: "GET",
//     headers: { "x-access-token": accessToken },
//   }).then((res) => res.json());
//   console.log(res);
//   return {
//     props: { fetchedPost: data },
//   };
// }

function Post({ fetchedPost, direction, ...args }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { asPath } = useRouter();
  let pageId = id || asPath.split("/")[2];
  const { register, handleSubmit } = useForm();

  const accessToken = useSelector((state) => state.user.accessToken);
  const { categories } = useSelector((state) => state.category);
  const { postIndex } = useSelector((state) => state.posts);

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
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_post/${pageId}`, {
      method: "GET",
      headers: { "x-access-token": accessToken },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("error", error);
      });
    setBlog(data.Data[0]);
    setCategory(data.Data[0].CategoryId);
    setTitle(data.Data[0].Title);
    setPost(data.Data[0].Body);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0] || blog.Picture);
    // formData.append("file", data.file[0]);
    formData.append("Body", post);
    formData.append("Title", title);
    formData.append("CategoryId", category);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/update/${pageId}`, {
      method: "POST",
      headers: { "x-access-token": accessToken },
      body: formData,
    }).then((res) => res.json());
    res.MessageCode === "200" && router.push("/");
  };

  const handleDelete = () => {
    console.log("deleted");
    dispatch(removePost(postIndex));
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
          <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Edit post</h2>
          <Row>
            <Col>
              <img alt="Sample" src={blog.Picture} className="postImg" style={{ marginLeft: "15px" }} />
            </Col>
            <Col>
              <Label>Change Picture</Label>
              <input type="file" {...register("file")} style={{ marginBottom: "15px" }} />
            </Col>
          </Row>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between">
                <CardTitle tag="h5">
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </CardTitle>
                <CardSubtitle className="text-muted" tag="h6">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                    <DropdownToggle caret>{categories[category - 1]}</DropdownToggle>
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
                  user: {blog.UserId}
                </CardSubtitle>
              </div>
              <CardText>
                <RichText post={post} setPost={setPost} />
                {/* <textarea className={styles.textarea} value={post} onChange={(e) => setPost(e.target.value)}></textarea> */}
              </CardText>

              <div className="d-flex justify-content-between">
                {isCurrentUser && (
                  // <Button type="submit" onClick={handlePost}>
                  <Button type="submit">Post</Button>
                )}
                {isAdmin && (
                  <Button color="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Post;
