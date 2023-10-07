import React from 'react';
import '../Header/Header.css';

const Header = () => {
  return (
    <div className="header d-flex justify-content-start align-items-center">
      <div className="title">
        <h1>Приложение заметки</h1>
      </div>
      <div className="new_notice">
        <button type="button" className="btn btn-primary">Новая заметка</button>
      </div>
    </div>
  )
};

export default Header;