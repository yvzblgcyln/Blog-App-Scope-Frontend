import React, { useEffect } from "react";
import { useRouter } from "next/router";

function EditUser() {
  const router = useRouter();
  let isCurrentUser = true;

  useEffect(() => {
    !isCurrentUser && router.push("/");
  }, []);

  return <div>EditUser</div>;
}

export default EditUser;
