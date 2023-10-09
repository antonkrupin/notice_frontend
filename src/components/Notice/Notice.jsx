import React from 'react';
import { useNavigate } from 'react-router-dom';

import i18n from '../../asserts/i18';

import '../Notice/Notice.css';

const Notice = (props) => {
  const navigate = useNavigate();
  const { id, body, creation_date, editDate } = props;

  const editNotice = () => {
    navigate(`/editNotice/${id}`);
  };

  const deleteNotice = async () => {
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
        <h5 className="text-primary">{i18n.t('notice.creationDate')} {creation_date}</h5>
        {editDate && (<h5 className="text-success">{i18n.t('notice.editDate')} {editDate}</h5>)}
      </div>
      <div className="notice_body">
        <h3>
          {body}
        </h3>
      </div>
      <div className="notice_buttons">
        <button className="btn btn-success" onClick={editNotice}>{i18n.t('buttons.editBtn')}</button>
        <button className="btn btn-danger" onClick={deleteNotice}>{i18n.t('buttons.deleteBtn')}</button>
      </div>
    </div>
  )
};

export default Notice;