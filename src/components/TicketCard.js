import React from 'react';
import './TicketCard.css';
import HighPriorityIcon from '../assets/Img - High Priority.svg';
import LowPriorityIcon from '../assets/Img - Low Priority.svg';
import MediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import NoPriorityIcon from '../assets/No-priority.svg';
import UrgentPriorityGreyIcon from '../assets/SVG - Urgent Priority grey.svg';

// TicketCard component to display ticket details
const TicketCard = ({ ticket, grouping }) => {
  const getPriorityIcon = (priority) => {
    if (grouping === 'priority') {
      return null;
    }

    switch (priority) {
      case 4:
        return UrgentPriorityGreyIcon;
      case 3:
        return HighPriorityIcon;
      case 2:
        return MediumPriorityIcon;
      case 1:
        return LowPriorityIcon;
      case 0:
        return NoPriorityIcon;
      default:
        return null;
    }
  };

  const priorityIcon = getPriorityIcon(ticket.priority);

  return (
    <div className="ticket-card">
      <h4>{ticket.id}</h4>
      <h5>{ticket.title}</h5>
      <div className="tag-container">
        {priorityIcon && <img className='svg-left' src={priorityIcon} alt="Priority Icon" />}
        <span className="ticket-tag">{ticket.tag}</span>
      </div>
    </div>
  );
};

export default TicketCard;
