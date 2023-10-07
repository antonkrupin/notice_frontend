/* eslint-disable default-case */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const createNewNotice = () => {
    navigate('/addNotice');
  }

  const backToNoticeList = () => {
    navigate('/');
  }

  switch(location.pathname.split('/')[1]) {
    case 'addNotice': {
      return (
        <div className="new_notice">
          <button type="button" className="btn btn-primary" onClick={backToNoticeList}>Назад</button>
        </div>
      )
    }
    case 'editNotice': {
      return (
        <div className="new_notice">
          <button type="button" className="btn btn-primary" onClick={backToNoticeList}>Назад</button>
        </div>
      )
    }
    default: {
      return (
        <div className="new_notice">
          <button type="button" className="btn btn-primary" onClick={createNewNotice}>Новая заметка</button>
        </div>
      )
    }
  }
};

export default HeaderButton;