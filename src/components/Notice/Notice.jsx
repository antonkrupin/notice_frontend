import React from 'react';
import '../Notice/Notice.css';

const Notice = (props) => {
  const { id, body, creation_date } = props;
  console.log(id);
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
        <button className="btn btn-success">Редактировать</button>
        <button className="btn btn-danger">Удалить</button>
      </div>
    </div>
  )
};

export default Notice;