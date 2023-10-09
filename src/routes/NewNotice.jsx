import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import i18n from '../asserts/i18';
import { setStatus, setError } from '../slices/mainReducer';
import { fetchStatus, fetchError } from '../slices/selectors';

import Spinner from '../components/Spinner/Spinner';


const NewNotice = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const textareaRef = useRef();
  const formRef = useRef();

	const status = useSelector(fetchStatus);
	const error = useSelector(fetchError);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const addNewNoticeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newNotice = {};
    newNotice.body = formData.get('noticeBody');
    newNotice.creationDate = new Date().toLocaleString("ru");

    if (newNotice.body) {
			dispatch(setStatus('addNotice'));

      await fetch('http://localhost:5000/api/addNotice', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newNotice)
      });

			dispatch(setStatus(''));
			dispatch(setError(''));
      navigate('/');
    } else {
			dispatch(setError('emptyNotice'));
		}
  };

  const resetErrorOnFocus = () => {
		dispatch(setError(''));
	}

  return (
		<>
		<Spinner />
    {!status && (
			<div className="d-flex flex-column justify-content-start">
				<h3>
					{i18n.t('ui.titles.newNotice')}
				</h3>
				<form
					className="d-flex flex-column align-items-start"
					onSubmit={addNewNoticeHandler}
					ref={formRef}
				>
					<textarea
            onFocus={resetErrorOnFocus}
						className="mb-3"
						name="noticeBody"
						placeholder="Текст заметки"
						rows="4"
						cols="50"
						ref={textareaRef}
					>
					</textarea>
					<button
						type="submit"
						className="btn btn-primary"
					>
						{i18n.t('buttons.addBtn')}
					</button>
				</form>
				{error && (
					<div>
						<h6 className="text-danger">
							{i18n.t('errors.emptyNotice')}
						</h6>
					</div>
				)}
			</div>
		)}
		</>
  )
};

export default NewNotice;
