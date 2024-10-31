import React from "react";
import ReactQuill from "react-quill-new";

export default function Editor({
  onChange, value
}: {
  onChange: (context: string) => void;
  value: string;
}) {

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      className="h-96 mb-20"
      placeholder="내용을 입력하세요..."
      value={value}
      onChange={onChange}
      modules={modules}
    />
  )
}