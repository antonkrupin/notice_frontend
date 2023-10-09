import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../../asserts/i18';

import { loadNotices, setStatus } from '../../slices/mainReducer';
import { fetchNotices,fetchStatus } from '../../slices/selectors';
import Notice from '../Notice/Notice';
import Spinner from '../Spinner/Spinner';

import '../NoticeList/NoticeList.css';


const NoticeList = () => {
	const dispatch = useDispatch();
	const notices = useSelector(fetchNotices);
	const status = useSelector(fetchStatus);

  useEffect(() => {
    const sendRequest = async () => {
      try {
				dispatch(setStatus('loadingNotices'));
        const response = await fetch('http://localhost:5000/api/');
        const responseData = await response.json();
				dispatch(loadNotices(responseData.reverse()));
				dispatch(setStatus(''));
      } catch (err) {
        console.log(err);
      }
    }
    sendRequest();
  }, [dispatch]);

  return (
    <div className="notice_list">
      <h3>{i18n.t('ui.titles.noticeList')}</h3>
			<Spinner />
      {!status && notices.map((notice) => (
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

export default NoticeList;
