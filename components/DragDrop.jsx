import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ setImg }) {
  const [test, setTest] = useState();
  const handleChange = (file) => {
    // setImg(file);
    setTest(file);
    console.log(test);
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log("Selected file name:", fileName);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}

export default DragDrop;
