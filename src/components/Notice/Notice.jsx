import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../Notice/Notice.css';

const Notice = (props) => {
  const navigate = useNavigate();
  const { id, body, creation_date } = props;

  const editNotice = () => {
    navigate(`/editNotice/${id}`);
  };

  const deleteNotice = async () => {
    console.log('test');
    try {
      await fetch(`http://localhost:5000/api/notice/${id}`, {
        method: 'DELETE',
        headers: {},
        body: null
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="notice d-flex justify-content-between" id={id}>
      <div className="notice_creation_date">
        <h4>Дата создания: {creation_date}</h4>
      </div>
      <div className="notice_body">
        <h3>
          {body}
        </h3>
      </div>
      <div className="notice_buttons">
        <button className="btn btn-success" onClick={editNotice}>Редактировать</button>
        <button className="btn btn-danger" onClick={deleteNotice}>Удалить</button>
      </div>
    </div>
  )
};

export default Notice;