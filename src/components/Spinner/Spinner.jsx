/* eslint-disable default-case */
import React from 'react';

import i18n from '../../asserts/i18';

import { useSelector } from 'react-redux';
import { fetchStatus } from '../../slices/selectors';

const Spinner = () => {
	const status = useSelector(fetchStatus);
	switch (status) {
		case 'addNotice': {
			return (
				<div className="d-flex justify-content-center align-items-center">
				<div className="spinner-border text-primary" role="status">
				</div>
				<h5 className="ml-5">
					{i18n.t('spinner.addNotice')}
				</h5>
			</div>
			)
		}
		case 'loadEditingNotice': {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<div className="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">
						{i18n.t('spinner.editNoticeLoading')}
					</h5>
				</div>
			)
		}
		case 'saveEditNotice': {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<div className="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">
						{i18n.t('spinner.saveEditNotice')}
					</h5>
				</div>
			)
		}
		case 'loadingNotices': {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<div className="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">
						{i18n.t('spinner.noticeListLoading')}
					</h5>
				</div>
			)
		}
		case 'deleteNotice': {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<div className="spinner-border text-primary" role="status">
					</div>
					<h5 className="ml-5">
						{i18n.t('spinner.deleteNotice')}
					</h5>
				</div>
			)
		}
	}
};

export default Spinner;
