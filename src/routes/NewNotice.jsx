import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewNotice = () => {
  const textareaRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const addNewNotice = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newNotice = {};
    newNotice.body = formData.get('noticeBody');
    newNotice.creationDate = new Date().toLocaleString("ru");
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
    <div className="d-flex flex-column">
      <h1>Новая заметка</h1>
      <form onSubmit={addNewNotice} ref={formRef}>
        <textarea
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
  )
};

export default NewNotice;