import { useEffect, useState } from "react";
import { Container, Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, setPosts } from "../redux/postsSlice";
import Page from "@/components/Page";
import PostCard from "@/components/PostCard";

export default function Home() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const { filter, categories } = useSelector((state) => state.category);
  const { pageCount } = useSelector((state) => state.posts);
  const accessToken = useSelector((state) => state.user.accessToken);
  const categoryId = useSelector((state) => state.category.filter);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    let url = categoryId
      ? `${process.env.NEXT_PUBLIC_API_URL}/get_posts_by_category_id/${categoryId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/getPosts`;
    let test = { url, accessToken };
    dispatch(fetchData(test));
  }, [categoryId]);

  return (
    <Container style={{ maxWidth: "700px" }}>
      <h1 style={{ margin: " 20px", textAlign: "center" }}>
        Blog List{categoryId && <span> : {categories[filter - 1]}</span>}
      </h1>
      <Row>
        <Col>
          {posts &&
            posts.slice((activePage - 1) * 5, activePage * 5).map((blog, index) => (
              <div key={index}>
                <PostCard index={index} blog={blog} isHome={true} />
              </div>
            ))}
        </Col>
      </Row>
      {posts && <Page activePage={activePage} setActivePage={setActivePage} pageCount={pageCount} />}
    </Container>
  );
}
