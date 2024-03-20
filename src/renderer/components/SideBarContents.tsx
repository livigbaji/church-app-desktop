import React from 'react';
import '../styles/SideBarContents.css';
import { Link } from 'react-router-dom';


interface SideBarContentsProps {
  text: string;
  Icon: React.ElementType;
  active?: boolean;
  to: string
}

const SideBarContents: React.FC<SideBarContentsProps> = ({ active, text, Icon, to }) => {
  return (
    <Link to={to} className={`sidebar-contents ${active && 'sidebar-contents-active'}`}>
      <Icon />
      <p>{text}</p>
    </Link>
  );
};

export default SideBarContents;
