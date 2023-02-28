import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import Link from "next/link";
import { useSelector } from "react-redux";

import parse from "html-react-parser";
import Buttons from "./Buttons";

function PostCard({ index, blog, isHome, setEditMode }) {
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
          <img src={blog.Picture} alt="" className="postImg" />
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
            <Buttons setEditMode={setEditMode} isHome={isHome} blogId={blog.Id} index={index} />
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default PostCard;
