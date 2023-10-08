import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditNotice = () => {
  const id = useParams().id;
  const formRef = useRef();
  const textareaRef = useRef();
  const navigate = useNavigate();
  const [notice, setNotice] = useState({});

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/editNotice/${id}`);
        const responseData = await response.json();
        setNotice(responseData);
      } catch (err) {
        console.log(err);
      }
    }
    sendRequest();
    textareaRef.current.focus();
  }, [notice, id]);

  const updateNotice = async (e) => {
    e.preventDefault();
    const updatedNotice = {};
    const formData = new FormData(formRef.current);

    updatedNotice.body = formData.get('noticeBody');
    if (updatedNotice.body) {
      await fetch(
        `http://localhost:5000/api/editNotice/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedNotice)
        });
        navigate('/');
    }
  }

  return (
    <div className="d-flex justify-content-center" id={id}>
      <div className="notice_creation_date">
        <h5>Дата создания: {notice.creationDate}</h5>
      </div>
      <div className="notice_body">
        <form onSubmit={updateNotice} ref={formRef}>
          <textarea
            name="noticeBody"
            defaultValue={notice.body}
            ref={textareaRef}
            rows="4"
            cols="50"
          >
          </textarea>
          <div className="notice_buttons">
            <button
              type="submit"
              className="btn btn-success"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default EditNotice;

/*
<button
              className="btn btn-danger"
              onClick={deleteNotice}
            >
              Удалить
            </button>
*/