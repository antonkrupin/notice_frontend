import React from 'react';

import HeaderButton from '../HeaderButton/HeaderButton';

import '../Header/Header.css';

const Header = () => {
  return (
    <div className="header d-flex justify-content-start align-items-center">
      <div className="title">
        <h1>Приложение заметки</h1>
      </div>
      <HeaderButton />
    </div>
  )
};

export default Header;