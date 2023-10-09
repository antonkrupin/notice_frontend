import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import i18n from '../asserts/i18';
import { setStatus, setError } from '../slices/mainReducer';
import { fetchStatus, fetchError } from '../slices/selectors';

import Spinner from '../components/Spinner/Spinner';

const EditNotice = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

  const formRef = useRef();
  const textareaRef = useRef();

	const id = useParams().id;
	const status = useSelector(fetchStatus);
	const error = useSelector(fetchError);
  const [notice, setNotice] = useState({});


  useEffect(() => {
    const sendRequest = async () => {
      try {
				dispatch(setStatus('loadEditingNotice'));

        const response = await fetch(`http://localhost:5000/api/editNotice/${id}`);
        const responseData = await response.json();

        setNotice(responseData);
				dispatch(setStatus(''));
      } catch (err) {
        console.log(err);
      }
    }
    sendRequest();
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
  }, [id, dispatch]);

  const updateNoticeHandler = async (e) => {
    e.preventDefault();
    const updatedNotice = {};
    const formData = new FormData(formRef.current);

    updatedNotice.body = formData.get('noticeBody');
    if (updatedNotice.body) {
			dispatch(setStatus('saveEditNotice'));

      await fetch(
        `http://localhost:5000/api/editNotice/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedNotice)
        });
			dispatch(setError(''));
			dispatch(setStatus(''));
			navigate('/');
    } else {
			dispatch(setError('emptyNotice'));
		}
  }

	const resetErrorOnFocus = () => {
		dispatch(setError(''));
	}

  return (
		<>
			<Spinner />
			{!status && (
				<div className="d-flex justify-content-center" id={id}>
					<div className="notice_creation_date">
						<h5>
							{i18n.t('notice.creationDate')} {notice.creationDate}
						</h5>
					</div>
					<div className="notice_body">
						<form
							onSubmit={updateNoticeHandler}
							ref={formRef}
						>
							<textarea
								onFocus={resetErrorOnFocus}
								name="noticeBody"
								defaultValue={notice.body}
								ref={textareaRef}
								rows="4"
								cols="50"
							>
							</textarea>
							<div className="notice_buttons">
								<button
									type="submit"
									className="btn btn-success"
								>
									{i18n.t('buttons.saveBtn')}
								</button>
							</div>
						</form>
						{error && (
							<div>
								<h6 className="text-danger">
									{i18n.t('errors.emptyNotice')}
								</h6>
							</div>
						)}
					</div>
				</div>
			)}
		</>
  )
};

export default EditNotice;
