import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/postsSlice";

const blogs = [
  {
    user: "yavuz",
    title: "blog 1",
    post: "Some quick example text to build on the card title and make up the bulk of the card‘s content.",
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

  let pageCount = Math.ceil(blogs.length / 5);
  let dummyArray = Array(pageCount).fill(0);
  const [activePage, setActivePage] = useState(1);

  const posts = useSelector((state) => state.posts);
  const filter = useSelector((state) => state.category.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(blogs));
    //console.log(posts);
  }, []);

  return (
    <Container>
      <h1 style={{ margin: " 40px 0 20px 0", textAlign: "center" }}>Blog List{filter && <span> : {filter}</span>}</h1>
      <Row>
        <Col>
          {blogs.slice((activePage - 1) * 5, activePage * 5).map((blog, index) => (
            <Card
              key={index}
              body
              style={{
                marginBottom: "20px",
                width: "60%",
                marginTop: "20px",
                marginLeft: "auto",
                marginRight: "auto",
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
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {blog.user}
                </CardSubtitle>
                <CardText>{blog.post}</CardText>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button href={`/post/${index}`}>Read More</Button>
                  {isAdmin && <Button color="danger">Delete</Button>}
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
      <Pagination
        style={{
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <PaginationItem style={{ visibility: activePage === 1 && "hidden" }}>
          <PaginationLink first onClick={() => setActivePage(1)} />
        </PaginationItem>
        <PaginationItem style={{ visibility: activePage === 1 && "hidden" }}>
          <PaginationLink previous onClick={() => setActivePage(activePage - 1)} />
        </PaginationItem>
        {dummyArray.map((dummy, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setActivePage(index + 1)}
              style={{ color: activePage === index + 1 && "black" }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem style={{ visibility: activePage === pageCount && "hidden" }}>
          <PaginationLink next onClick={() => setActivePage(activePage + pageCount)} />
        </PaginationItem>
        <PaginationItem style={{ visibility: activePage === pageCount && "hidden" }}>
          <PaginationLink last onClick={() => setActivePage(pageCount)} />
        </PaginationItem>
      </Pagination>
    </Container>
  );
}
