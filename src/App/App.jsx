import { useState, useEffect } from 'react';
import './App.css';
import ListButton from '../ListButton/ListButton';
import AddUserButton from '../AddUserButton/AddUserButton';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

function App() {
  const [users, setUsers] = useState([]); 
  const [isListOpen, setIsListOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  function openList() {
    setIsListOpen(true);
    setIsAddOpen(false);
  }

  function openAdd() {
    setIsListOpen(false);
    setIsAddOpen(true);
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((result) => result.json())
      .then((response) => setUsers(response));
  }, []);

  return (
    <div className="button-container">
      <BrowserRouter basename="/home-work-42/">
        <div className="navigation-buttons">
          <Link to="/list">
            <button type="button" onClick={openList}>List</button>
          </Link>
          <Link to="/add">
            <button type="button" onClick={openAdd}>Add</button>
          </Link>
        </div>

        <Routes>
          <Route
            path="/list"
            element={
              <ListButton
                users={users}
                setUsers={setUsers}
                isOpen={isListOpen}
                setIsOpen={setIsListOpen}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddUserButton
                users={users}
                setUsers={setUsers}
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                openList={openList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
