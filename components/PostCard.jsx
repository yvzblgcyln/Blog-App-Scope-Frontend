import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import Link from "next/link";
import { removePost } from "@/redux/postsSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function PostCard({ index, blog, isHome, setEditMode }) {
  const isAdmin = true;
  const isCurrentUser = true;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    console.log("deleted");
    dispatch(removePost(index));
    router.push("/");
  };

  return (
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
      {blog.img && <img alt="Sample" src={blog.img} className="postImg" />}
      <CardBody>
        <div className="d-flex justify-content-between">
          <CardTitle tag="h5">{blog.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {blog.category}
          </CardSubtitle>
        </div>
        <Link className="userLink " href={`/user/${index}`}>
          {blog.user}
        </Link>
        {isHome && <CardText>{blog.post.substring(0, 200)}...</CardText>}
        <CardText>{blog.post}</CardText>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isHome && <Link href={`/post/${index}`}>Read More</Link>}
          {isCurrentUser && !isHome && <Button onClick={() => setEditMode(true)}>Edit</Button>}
          {isAdmin && (
            <Button color="danger" onClick={() => handleDelete(index)}>
              Delete
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default PostCard;
