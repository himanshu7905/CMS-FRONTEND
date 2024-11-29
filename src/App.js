import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ContactList from './components/ContactList';
import AddEditContact from './components/AddEditContact';

const App = () => {
  const headerStyle = {
    backgroundColor: '#4caf50', // Green background for the header
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  };

  const appStyle = {
    backgroundColor: '#f0f0f0', // Light gray background for the app
    minHeight: '100vh', // Full height of the viewport
    margin: 0,
    padding: 0,
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1>Contact Management System</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/add-edit/:id?" element={<AddEditContact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
