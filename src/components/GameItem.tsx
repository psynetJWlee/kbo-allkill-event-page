
import React from 'react';
import TeamBox from './TeamBox';
import { GameType } from '@/types/game';

interface GameItemProps {
  game: GameType;
  selectedSide?: string;
  onTeamSelect: (gameId: number, team: 'home' | 'away') => void;
  index: number; // Add index prop to track position in the list
}

const GameItem: React.FC<GameItemProps> = ({ game, selectedSide, onTeamSelect, index }) => {
  const { id, homeTeam, awayTeam, time, status } = game;
  
  // Apply alternate background color for 1st, 3rd, and 5th games (0-based index: 0, 2, 4)
  const isAlternateBackground = index % 2 === 0;
  
  return (
    <div 
      className={`game-item ${isAlternateBackground ? 'alternate-bg' : ''}`} 
      data-index={id}
    >
      <div className="team-column">
        <TeamBox 
          team={homeTeam} 
          side="home" 
          isSelected={selectedSide === 'home'} 
          onClick={() => onTeamSelect(id, 'home')} 
        />
        <div className={`vote-count ${homeTeam.votes >= awayTeam.votes ? 'higher' : 'lower'}`}>
          {homeTeam.votes.toLocaleString()}
        </div>
      </div>
      
      <div className="game-status">
        <div className="voting-text">{status}</div>
        <div className="game-time">{time}</div>
      </div>
      
      <div className="team-column">
        <TeamBox 
          team={awayTeam} 
          side="away" 
          isSelected={selectedSide === 'away'} 
          onClick={() => onTeamSelect(id, 'away')} 
        />
        <div className={`vote-count ${awayTeam.votes >= homeTeam.votes ? 'higher' : 'lower'}`}>
          {awayTeam.votes.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default GameItem;
