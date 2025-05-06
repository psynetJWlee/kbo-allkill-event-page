
import React from 'react';
import TeamBox from './TeamBox';

interface GameResultItemProps {
  game: {
    id: number;
    homeTeam: {
      name: string;
      logo: string;
      votes: number;
    };
    awayTeam: {
      name: string;
      logo: string;
      votes: number;
    };
    homeScore: number;
    awayScore: number;
    status: string;
  };
  selectedSide?: string;
  onTeamSelect: (gameId: number, team: 'home' | 'away') => void;
  index: number;
}

const GameResultItem: React.FC<GameResultItemProps> = ({ game, selectedSide, onTeamSelect, index }) => {
  const { id, homeTeam, awayTeam, homeScore, awayScore, status } = game;
  
  // Apply alternate background color for 1st, 3rd, and 5th games (0-based index: 0, 2, 4)
  const isAlternateBackground = index % 2 === 0;
  
  // Determine which score is higher
  const homeScoreHigher = homeScore > awayScore;
  const awayScoreHigher = awayScore > homeScore;
  const scoreEqual = homeScore === awayScore;
  
  return (
    <div 
      className={`game-item flex items-center px-4 flex-1 ${isAlternateBackground ? 'alternate-bg' : ''}`} 
      data-index={id}
    >
      <div className="team-column flex justify-start flex-none">
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
      
      <div className="game-status flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <span 
            style={{ 
              fontSize: '30px', 
              fontWeight: 'bold',
              color: homeScoreHigher ? '#FFC736' : (scoreEqual ? '#FFFFFF' : '#FFFFFF')
            }}
          >
            {homeScore}
          </span>
          <span style={{ fontSize: '15px', color: '#555555', margin: '0 8px' }}>vs</span>
          <span 
            style={{ 
              fontSize: '30px', 
              fontWeight: 'bold',
              color: awayScoreHigher ? '#FFC736' : (scoreEqual ? '#FFFFFF' : '#FFFFFF')
            }}
          >
            {awayScore}
          </span>
        </div>
        <div style={{ fontSize: '14px', color: '#FFFFFF' }}>{status}</div>
      </div>
      
      <div className="team-column flex justify-end flex-none text-right">
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

export default GameResultItem;
