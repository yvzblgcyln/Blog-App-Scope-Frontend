import { useEffect, useState } from "react";
import { Container, Col, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/postsSlice";
import Link from "next/link";
import Page from "@/components/Page";

const blogs = [
  {
    user: "yavuz",
    title: "blog 1",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content. Some quick example text to build on the card title and make up the bulk of the card‘s content. Some quick example text to build on the card title and make up the bulk of the card‘s content. Some quick example text to build on the card title and make up the bulk of the card‘s content",
    img: "https://picsum.photos/300/210",
    category: "Art",
  },
  {
    user: "bilge",
    title: "blog 2",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
    img: "https://picsum.photos/300/200",
    category: "Sport",
  },
  {
    user: "ceylan",
    title: "blog 3",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
    img: "https://picsum.photos/310/200",
    category: "Art",
  },
  {
    user: "yavuz",
    title: "blog 1",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
    img: "https://picsum.photos/300/220",
    category: "Photo",
  },
  {
    user: "bilge",
    title: "blog 1",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
    img: "https://picsum.photos/320/200",
    category: "Art",
  },
  {
    user: "yavuz",
    title: "blog 1",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
    img: "https://picsum.photos/300/200",
    category: "Art",
  },
];

export default function Home() {
  const isAdmin = true;

  const [activePage, setActivePage] = useState(1);
  let pageCount = Math.ceil(blogs.length / 5);

  const posts = useSelector((state) => state.posts);
  const filter = useSelector((state) => state.category.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(blogs));
    //console.log(posts);
  }, []);

  return (
    <Container style={{ maxWidth: "700px" }}>
      <h1 style={{ margin: " 20px", textAlign: "center" }}>Blog List{filter && <span> : {filter}</span>}</h1>
      <Row>
        <Col>
          {blogs.slice((activePage - 1) * 5, activePage * 5).map((blog, index) => (
            <Card
              key={index}
              body
              style={{
                marginBottom: "20px",
              }}
            >
              <img alt="Sample" src={blog.img} />
              <CardBody>
                <div className="d-flex justify-content-between">
                  <CardTitle tag="h5">{blog.title}</CardTitle>{" "}
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {blog.category}
                  </CardSubtitle>
                </div>
                <Link className="mb-2 text-muted" href={`/user/${index}`}>
                  {blog.user}
                </Link>
                <CardText>{blog.post.substring(0, 200)}...</CardText>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button href={`/post/${index}`}>Read More</Button>
                  {isAdmin && <Button color="danger">Delete</Button>}
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
      <Page activePage={activePage} setActivePage={setActivePage} pageCount={pageCount} />
    </Container>
  );
}
