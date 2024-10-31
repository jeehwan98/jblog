// import React, { useState } from "react";
// import ReactQuill from "react-quill-new";

// export default function Editor({
//   onChange, value
// }: {
//   onChange: (context: string) => void;
//   value: string;
// }) {

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ align: ["right", "center", "justify"] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//     ],
//   };

//   return (
//     <ReactQuill
//       theme="snow"
//       className="h-96 mb-20"
//       placeholder="내용을 입력하세요..."
//       value={value}
//       onChange={onChange}
//       modules={modules}
//     />
//   )
// }

import React, { useState } from "react";
import ReactQuill from "react-quill-new";

interface EditorProps {
  onChange: (context: string) => void;
  value: string;
}

export default function Editor({ onChange, value }: EditorProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = () => {
    setIsComposing(false);
    // Ensure the value updates after composition ends
    onChange(value);
  };

  const handleChange = (content: string) => {
    if (!isComposing) {
      onChange(content);
    }
  };

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
    <div
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
    >
      <ReactQuill
        theme="snow"
        className="h-96 mb-20"
        placeholder="내용을 입력하세요..."
        modules={modules}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
