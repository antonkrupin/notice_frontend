import React from 'react';

import i18n from '../../asserts/i18';
import HeaderButton from '../HeaderButton/HeaderButton';

import '../Header/Header.css';

const Header = () => {
  return (
    <div className="header d-flex justify-content-start align-items-center">
      <div className="title">
        <h1>
          {i18n.t('ui.appName')}
        </h1>
      </div>
      <HeaderButton />
    </div>
  )
};

export default Header;