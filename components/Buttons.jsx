import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { removePost, setPostId, setPostIndex } from "@/redux/postsSlice";
import { useRouter } from "next/router";

function Buttons({ setEditMode, isHome, blogId, index }) {
  const isAdmin = true;
  const isCurrentUser = true;

  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector((state) => state.user.accessToken);

  const handleDelete = async (index) => {
    console.log("deleted");
    dispatch(removePost(index));
    const res = await fetch(`http://127.0.0.1:5000/post/delete/${blogId}`, {
      headers: { "x-access-token": accessToken },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
    router.push("/");
  };

  const handleReadMore = async () => {
    dispatch(setPostId(blogId));
    dispatch(setPostIndex(index));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {isHome && (
        <Link href={`/post/${blogId}`} onClick={handleReadMore}>
          Read More
        </Link>
      )}
      {isCurrentUser && !isHome && <Button onClick={() => setEditMode(true)}>Edit</Button>}
      {isAdmin && (
        <Button color="danger" onClick={() => handleDelete(index)}>
          Delete
        </Button>
      )}
    </div>
  );
}

export default Buttons;
