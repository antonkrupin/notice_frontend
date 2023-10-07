import React from 'react';
import Header from './components/Header/Header';
import NoticeList from './components/NoticeList/NoticeList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="main d-flex align-items-center flex-column">
      <Header />
      <NoticeList />
    </div>
  )
}

export default App;
