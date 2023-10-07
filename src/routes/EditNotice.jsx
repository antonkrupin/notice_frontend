import React from 'react';
import { useParams } from 'react-router-dom';

const notices = [
  {
    id: 1,
    body: "first notice",
    creation_date: '11.01.2023',
  },
  {
    id: 2,
    body: "second notice",
    creation_date: '12.01.2023',
  },
  {
    id: 3,
    body: "third notice",
    creation_date: '13.01.2023',
  },
]

const EditNotice = () => {
  const id = useParams().id;
  const [notice] = notices.filter((notice) => parseInt(id) === notice.id);

  return (
    <div className="notice d-flex justify-content-between" id={id}>
      <div className="notice_creation_date">
        <h4>Дата создания: {notice.creation_date}</h4>
      </div>
      <div className="notice_body">
        <h3>
          {notice.body}
        </h3>
      </div>
      <div className="notice_buttons">
        <button className="btn btn-success" >Сохранить</button>
        <button className="btn btn-danger" >Удалить</button>
      </div>
    </div>
  )
};

export default EditNotice;