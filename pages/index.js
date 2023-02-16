import { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/postsSlice";
import Page from "@/components/Page";
import PostCard from "@/components/PostCard";

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
            <div key={index}>
              <PostCard index={index} blog={blog} isHome={true} />
            </div>
          ))}
        </Col>
      </Row>
      <Page activePage={activePage} setActivePage={setActivePage} pageCount={pageCount} />
    </Container>
  );
}
