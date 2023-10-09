import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import i18n from '../../asserts/i18';
import { deleteNotice, setStatus } from '../../slices/mainReducer';
import { fetchStatus } from '../../slices/selectors';

import '../Notice/Notice.css';

const Notice = (props) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

	const status = useSelector(fetchStatus);
  const { id, body, creation_date, editDate } = props;

  const editNoticeHandler = () => {
    navigate(`/editNotice/${id}`);
  };

  const deleteNoticeHandler = async () => {
    try {
			dispatch(setStatus('deleteNotice'));

      await fetch(`http://localhost:5000/api/notice/${id}`, {
        method: 'DELETE',
        headers: {},
        body: null
      });

			dispatch(setStatus(''));
    } catch (err) {
      console.log(err);
    }
		dispatch(deleteNotice({id}));
  }

  return (
    <>
			{!status && (
				<div className="notice d-flex justify-content-between" id={id}>
					<div className="notice_creation_date">
						<h5 className="text-primary">
							{i18n.t('notice.creationDate')} {creation_date}
						</h5>
						{editDate && (
							<h5 className="text-success">
								{i18n.t('notice.editDate')} {editDate}
							</h5>
						)}
					</div>
					<div className="notice_body">
						<h3>
							{body}
						</h3>
					</div>
					<div className="notice_buttons">
						<button
							className="btn btn-success"
							onClick={editNoticeHandler}
						>
							{i18n.t('buttons.editBtn')}
						</button>
						<button
							className="btn btn-danger"
							onClick={deleteNoticeHandler}
						>
							{i18n.t('buttons.deleteBtn')}
						</button>
					</div>
				</div>
			)}
		</>
  )
};

export default Notice;