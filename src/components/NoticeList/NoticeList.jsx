import React, { useEffect, useState } from 'react';
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
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/');
        const responseData = await response.json();
        setNotices(responseData.reverse());
      } catch (err) {
        console.log(err);
      }
    }
    sendRequest();
  }, [notices]);

  return (
    <div className="notice_list">
      <h3>Список заметок:</h3>
      {notices.map((notice) => (
        <Notice key={notice._id} id={notice._id} body={notice.body} creation_date={notice.creationDate}/>
      ))}
    </div>
  )
};

export default NoticeList

/*
{notices.map((notice) => (
        <Notice key={notice.id} id={notice.id} body={notice.body} creation_date={notice.creation_date}/>
      ))}
*/