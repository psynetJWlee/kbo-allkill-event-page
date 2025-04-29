
import React from 'react';
import { TeamType } from '@/types/game';

interface TeamBoxProps {
  team: TeamType;
  side: 'home' | 'away';
  isSelected: boolean;
  onClick: () => void;
}

const TeamBox: React.FC<TeamBoxProps> = ({ team, side, isSelected, onClick }) => {
  return (
    <button 
      className={`team-box ${isSelected ? `selected-${side} selected` : ''}`} 
      data-team={side}
      onClick={onClick}
    >
      <img className="team-logo" src={team.logo} alt={`${team.name} 로고`} />
      <span className="team-name">{team.name}</span>
    </button>
  );
};

export default TeamBox;
