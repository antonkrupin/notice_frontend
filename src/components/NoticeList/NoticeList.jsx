import React, { useEffect, useState } from 'react';
import Notice from '../Notice/Notice';

import i18n from '../../asserts/i18';
import '../NoticeList/NoticeList.css';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
				setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/');
        const responseData = await response.json();
        setNotices(responseData.reverse());
      } catch (err) {
        console.log(err);
      }
			setIsLoading(false);
    }
    sendRequest();
  }, []);

  return (
    <div className="notice_list">
      <h3>{i18n.t('ui.titles.noticeList')}</h3>
			{isLoading && (
				<div className="d-flex justify-content-center align-items-center">
					<div class="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">{i18n.t('spinner.noticeListLoading')}</h5>
				</div>
			)}
      { !isLoading && notices.map((notice) => (
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
