import React, { useState, useEffect } from 'react';
import { fetchTickets, fetchUsers } from './apiService';
import KanbanBoard from '../components/KanbanBoard';
import './App.css';
import DisplayIcon from '../assets/Display.svg';
import DownIcon from '../assets/down.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(() => localStorage.getItem('sorting') || 'priority');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await fetchTickets();
        const userData = await fetchUsers();
        
        const userMap = {};
        userData.forEach(user => {
          userMap[user.id] = user.name;
        });

        setTickets(ticketData.tickets);
        setUsers(userMap);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="menu-button" onClick={toggleMenu}>
            <img src={DisplayIcon} alt="Display" className="menu-icon" />
            Display
            <img src={DownIcon} alt="Display" className="menu-icon" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="menu-dropdown">
            <label>Grouping:</label>
            <select value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>

            <label>Ordering:</label>
            <select value={sorting} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        )}
      </nav>

      <div className="board">
        <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
      </div>
    </div>
  );
};

export default App;
