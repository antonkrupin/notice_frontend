import React, { useEffect, useState } from 'react';
import Notice from '../Notice/Notice';

import '../NoticeList/NoticeList.css';

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
        <Notice
          key={notice._id}
          id={notice._id}
          body={notice.body}
          creation_date={notice.creationDate}
          editDate={notice.editDate}
        />
      ))}
    </div>
  )
};

export default NoticeList
