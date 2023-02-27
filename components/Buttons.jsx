import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { removePost } from "@/redux/postsSlice";

function Buttons({ isHome, isCurrentUser, isAdmin, blogId, index }) {
  const dispatch = useDispatch();

  const handleDelete = async (index) => {
    console.log("deleted");
    dispatch(removePost(index));

    // const res = await fetch(`http://127.0.0.1:5000/get_post/${index}`, {
    //   headers: { "x-access-token": accessToken },
    // }).then((res) => res.json());

    // console.log(res);
    //router.push("/");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {isHome && <Link href={`/post/${blogId}`}>Read More</Link>}
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
