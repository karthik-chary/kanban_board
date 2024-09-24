import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';
import MenuIcon from '../assets/3 dot menu.svg';
import TodoIcon from '../assets/To-do.svg';
import InProgressIcon from '../assets/in-progress.svg';
import BacklogIcon from '../assets/Backlog.svg';
import HighPriorityIcon from '../assets/Img - High Priority.svg';
import LowPriorityIcon from '../assets/Img - Low Priority.svg';
import MediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import NoPriorityIcon from '../assets/No-priority.svg';
import UrgentPriorityColorIcon from '../assets/SVG - Urgent Priority colour.svg';

const groupTickets = (tickets, grouping, users) => {
  const groups = {};
  tickets.forEach(ticket => {
    let groupKey;
    switch (grouping) {
      case 'status':
        groupKey = ticket.status;
        break;
      case 'user':
        groupKey = users[ticket.userId] || 'Unknown User';
        break;
      case 'priority':
        switch (ticket.priority) {
          case 4:
            groupKey = 'Urgent';
            break;
          case 3:
            groupKey = 'High';
            break;
          case 2:
            groupKey = 'Medium';
            break;
          case 1:
            groupKey = 'Low';
            break;
          case 0:
            groupKey = 'No priority';
            break;
          default:
            groupKey = 'Others';
        }
        break;
      default:
        groupKey = 'Others';
    }
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
  });
  return groups;
};

const sortTickets = (tickets, sorting) => {
  return tickets.sort((a, b) => {
    if (sorting === 'priority') {
      return b.priority - a.priority;
    } else if (sorting === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
};

const renderStatusIcon = (status) => {
  switch (status) {
    case 'Todo':
      return <img className="left-svg" src={TodoIcon} alt="To Do" />;
    case 'In progress':
      return <img className="left-svg" src={InProgressIcon} alt="In Progress" />;
    case 'Backlog':
      return <img className="left-svg" src={BacklogIcon} alt="Backlog" />;
    default:
      return null;
  }
};

const renderPriorityIcon = (priority) => {
  switch (priority) {
    case 'Urgent':
      return <img className="left-svg" src={UrgentPriorityColorIcon} alt="UrgentPriority" />;
    case 'High':
      return <img className="left-svg" src={HighPriorityIcon} alt="HighPriority" />;
    case 'Medium':
      return <img className="left-svg" src={MediumPriorityIcon} alt="MediumPriority" />;
    case 'Low':
      return <img className="left-svg" src={LowPriorityIcon} alt="LowPriority" />;
    case 'No priority':
      return <img className="left-svg" src={NoPriorityIcon} alt="NoPriority" />;
    default:
      return null;
  }
};

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  const groupedTickets = groupTickets(tickets, grouping, users);
  const sortedGroupedTickets = {};

  Object.keys(groupedTickets).forEach(group => {
    sortedGroupedTickets[group] = sortTickets(groupedTickets[group], sorting);
  });

  return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedTickets).map(group => (
        <div className="kanban-column" key={group}>
          <div className="kanban-column-header">
            <div className="kanban-column-title">
              {grouping === 'status'? renderStatusIcon(group):renderPriorityIcon(group)}
              <span>{group}</span>
            </div>
            <div className="kanban-column-icon">
              <img className="right-svg" src={MenuIcon} alt="Menu" />
            </div>
          </div>
          <div className="kanban-column-tickets">
            {sortedGroupedTickets[group].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
