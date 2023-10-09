import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Header from './components/Header/Header';
import NoticeList from './components/NoticeList/NoticeList';
import NewNotice from './routes/NewNotice';
import EditNotice from './routes/EditNotice';
import routes from './routes/routes';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <BrowserRouter>
      <div className="main d-flex align-items-center flex-column">
        <Header />
        <Routes>
          <Route path={routes.mainPath()} element={<NoticeList />}/>
          <Route path={routes.addNoticePath()} element={<NewNotice />} />
          <Route path={routes.editNoticePaht()} element={<EditNotice />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
