
import React from 'react';
import TeamBox from './TeamBox';
import { GameType } from '@/types/game';

interface GameItemProps {
  game: GameType;
  selectedSide?: string;
  onTeamSelect: (gameId: number, team: 'home' | 'away') => void;
}

const GameItem: React.FC<GameItemProps> = ({ game, selectedSide, onTeamSelect }) => {
  const { id, homeTeam, awayTeam, time, status } = game;
  
  return (
    <div className="game-item" data-index={id}>
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
