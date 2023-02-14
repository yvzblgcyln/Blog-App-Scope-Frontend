import React from "react";
import styles from "@/styles/user.module.css";

let user = { name: "yavuz", img: "https://picsum.photos/300/200", job: "Developer" };
function Profile() {
  return (
    <div className={styles.user}>
      <img className={styles.userImg} src={user.img} />
      <h3>{user.name}</h3>
      <h5>Job: {user.job}</h5>
      <div>resume</div>
    </div>
  );
}

export default Profile;
