import React from "react";
import styles from "@/styles/user.module.css";
import { Button } from "reactstrap";
import Link from "next/link";

let user = { name: "yavuz", img: "https://picsum.photos/300/200", job: "Developer" };
function Profile() {
  let isCurrentUser = true;
  return (
    <div className={styles.user}>
      <img className={styles.userImg} src={user.img} />
      <h3>{user.name}</h3>
      <h5>Job: {user.job}</h5>
      <div>resume</div>

      <Button className="p-2 m-2" color="warning" style={{ visibility: !isCurrentUser ? "hidden" : "visible" }}>
        <Link href="/user/edit" style={{ textDecoration: "none" }}>
          Edit Profile
        </Link>
      </Button>
    </div>
  );
}

export default Profile;
