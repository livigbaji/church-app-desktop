import React from 'react';
import '../styles/SideBarContents.css';

interface SideBarContentsProps {
  text: string;
  Icon: React.ElementType;
  active?: boolean
}

const SideBarContents: React.FC<SideBarContentsProps> = ({ active, text, Icon }) => {
  return (
    <div className={`sidebar-contents ${active && 'sidebar-contents-active'}`}>
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default SideBarContents;
