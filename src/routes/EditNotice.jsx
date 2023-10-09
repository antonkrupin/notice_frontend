import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import i18n from '../asserts/i18';

const EditNotice = () => {
  const id = useParams().id;
  const formRef = useRef();
  const textareaRef = useRef();
  const navigate = useNavigate();
  const [notice, setNotice] = useState({});
	const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
				setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/editNotice/${id}`);
        const responseData = await response.json();
        setNotice(responseData);
				setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    sendRequest();
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
  }, [id]);

  const updateNotice = async (e) => {
    e.preventDefault();
    const updatedNotice = {};
    const formData = new FormData(formRef.current);

    updatedNotice.body = formData.get('noticeBody');
    if (updatedNotice.body) {
			setIsLoading(true);
      await fetch(
        `http://localhost:5000/api/editNotice/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedNotice)
        });
			setIsLoading(false);
			navigate('/');
    }
  }

  return (
		<>
			{isLoading && (
				<div className="d-flex justify-content-center align-items-center">
					<div class="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">{i18n.t('spinner.editNoticeLoading')}</h5>
				</div>
			)}
			{!isLoading && (
				<div className="d-flex justify-content-center" id={id}>
					<div className="notice_creation_date">
						<h5>{i18n.t('notice.creationDate')} {notice.creationDate}</h5>
					</div>
					<div className="notice_body">
						<form onSubmit={updateNotice} ref={formRef}>
							<textarea
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
					</div>
				</div>
			)}
		</>
  )
};

export default EditNotice;

/*
<button
              className="btn btn-danger"
              onClick={deleteNotice}
            >
              Удалить
            </button>
*/