import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function RichText({ post, setPost }) {
  return (
    <div>
      <ReactQuill style={{ width: "100%", height: "250px", marginBottom: "70px" }} value={post} onChange={setPost} />
      {post}
    </div>
  );
}

export default RichText;
