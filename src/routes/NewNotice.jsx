import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const NewNotice = () => {
  const textareaRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    setText(text);
  };

  useEffect(() => {
    //textareaRef.current.focus();
  }, []);

  const addNewNotice = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newNotice = {};
    newNotice.body = formData.get('noticeBody');
    newNotice.creationDate = new Date().toLocaleString("ru");
    console.log(text);
    if (newNotice.body) {
      await fetch('http://localhost:5000/api/addNotice', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newNotice)
      });
      navigate('/');
    }
  };

  return (
    <>
      {<div style={{ height: "80px", overflow: "auto" }}>{text}</div>}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
          ]
        }}
      />
      <button className="btn btn-primary" onClick={addNewNotice}>Добавить</button>
    </>
  )
};

export default NewNotice;

/*
<div className="d-flex flex-column justify-content-start">
      <h3>Новая заметка</h3>
      <form
        className="d-flex flex-column align-items-start"
        onSubmit={addNewNotice}
        ref={formRef}
      >
        <textarea
          className="mb-3"
          name="noticeBody"
          placeholder="Текст заметки"
          rows="4"
          cols="50"
          ref={textareaRef}
        >

        </textarea>
        <button type="submit" className="btn btn-primary">Добавить</button>
      </form>
    </div>
*/