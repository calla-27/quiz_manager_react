import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import UserView from './views/element/UserView';
import QuestionView from './views/element/QuestionView';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/question" element={<QuestionView />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;