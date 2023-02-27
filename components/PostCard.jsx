import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import Buttons from "./Buttons";

function PostCard({ index, blog, isHome, setEditMode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const isCurrentUser = true;
  const isAdmin = true;
  const accessToken = useSelector((state) => state.user.accessToken);
  const categories = useSelector((state) => state.category.categories);

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
            <Buttons isHome={isHome} isCurrentUser={isCurrentUser} isAdmin={isAdmin} blogId={blog.id} index={index} />
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default PostCard;
