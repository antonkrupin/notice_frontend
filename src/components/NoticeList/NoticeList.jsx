import React from 'react';
import Notice from '../Notice/Notice';

import '../NoticeList/NoticeList.css';

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

const NoticeList = () => {
  return (
    <div className="notice_list">
      <h3>Список заметок:</h3>
      {notices.map((notice) => (
        <Notice key={notice.id} id={notice.id} body={notice.body} creation_date={notice.creation_date}/>
      ))}
    </div>
  )
};

export default NoticeList