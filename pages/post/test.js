import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Home() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data.file[0])
        formData.append("file", data.file[0]);
        formData.append("Body", data.Body);
        formData.append("CategoryId", data.CategoryId);
        formData.append("Title", data.Title);
        
        const res = await fetch("http://127.0.0.1:5000/addPost", {
            method: "POST",
            headers:{'x-access-token': accessToken},
            body: formData,
        }).then((res) => res.json());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <input type="text" {...register("Body")} />
        <input type="text" {...register("CategoryId")} />
        <input type="text" {...register("Title")} />
        <input type="submit" />
      </form>
    </div>
  );
}