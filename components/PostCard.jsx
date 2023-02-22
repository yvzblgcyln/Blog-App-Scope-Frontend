import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import Link from "next/link";
import { removePost } from "@/redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import parse from "html-react-parser";

function PostCard({ index, blog, isHome, setEditMode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAdmin = false;
  const isCurrentUser = false;
  const categories = useSelector((state) => state.category.categories);

  const handleDelete = (index) => {
    console.log("deleted");
    dispatch(removePost(index));
    router.push("/");
  };

  return (
    <>
      {blog && (
        <Card
          key={index}
          body
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            width: !isHome ? "60%" : "100%",
            marginLeft: !isHome ? "auto" : "0",
            marginRight: !isHome ? "auto" : "0",
          }}
        >
          <img alt="" src={blog.Picture} className="postImg" />
          <CardBody>
            <div className="d-flex justify-content-between">
              <CardTitle tag="h5">{blog.Title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {categories[blog.CategoryId - 1]}
              </CardSubtitle>
            </div>
            <Link className="userLink " href={`/user/${index}`}>
              UserId: {blog.UserId}
            </Link>
            <CardText>{parse(blog.Body)}</CardText>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {isHome && <Link href={`/post/${blog.Id}`}>Read More</Link>}
              {isCurrentUser && !isHome && <Button onClick={() => setEditMode(true)}>Edit</Button>}
              {isAdmin && (
                <Button color="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default PostCard;
