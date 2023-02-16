import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import Link from "next/link";

function PostCard({ index, blog, isHome, setEditMode }) {
  const isAdmin = true;
  const isCurrentUser = true;
  const handleDelete = () => {
    console.log("deleted");
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
      <img alt="Sample" src={blog.img} className="postImg" />
      <CardBody>
        <div className="d-flex justify-content-between">
          <CardTitle tag="h5">{blog.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {blog.category}
          </CardSubtitle>
        </div>
        <Link className="mb-2 text-muted" href={`/user/${index}`}>
          {blog.user}
        </Link>
        <CardText>{blog.post.substring(0, 200)}...</CardText>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isHome && <Button href={`/post/${index}`}>Read More</Button>}
          {isCurrentUser && !isHome && <Button onClick={() => setEditMode(true)}>Edit</Button>}
          {isAdmin && (
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default PostCard;
