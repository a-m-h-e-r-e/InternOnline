import React from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import TextEditor from "../TextEditor";

export default function NumberInput(props) {
  const { value, onChange } = props;
  const handleChange = (prop) => {
    onChange(prop);
  };
  return (
    <React.Fragment>
      {/* <TextEditor /> */}
      <ReactQuill
        theme="snow"
        name="question"
        id="question"
        value={value}
        // onChange={onChange}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}
