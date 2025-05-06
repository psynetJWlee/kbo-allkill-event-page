
import React from 'react';
import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import GameItem from '@/components/GameItem';
import { kboGames } from '@/data/kboTeamData';

interface TodayTeamSelectionProps {
  selected: Record<number, string>;
  onTeamSelect: (gameId: number, team: 'home' | 'away') => void;
  buttonRendered: boolean;
}

const TodayTeamSelection: React.FC<TodayTeamSelectionProps> = ({ selected, onTeamSelect, buttonRendered }) => {
  const isAllSelected = Object.keys(selected).length === 5;

  return (
    <div className="team-selection-section flex flex-col gap-4" id="team-selection-section-today">
      <h2 className="team-selection-title">올킬 도전!</h2>
      <div className="game-list flex flex-col gap-2" id="game-list">
        {kboGames.map((game, index) => (
          <GameItem
            key={game.id}
            game={game}
            selectedSide={selected[game.id]}
            onTeamSelect={onTeamSelect}
            index={index}
          />
        ))}
      </div>
      <div className="flex justify-center mt-[50px]">
        <Button 
          className="submit-btn mx-auto" 
          disabled={!isAllSelected}
          id="submit-allkill-btn"
          data-rendered-by="react"
          data-ready={buttonRendered.toString()}
          style={{ 
            backgroundColor: '#FFD700',
            opacity: isAllSelected ? 1 : 0.3,
            color: isAllSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)',
            fontSize: '24px',
            fontWeight: 'bold',
            height: '68px',
            width: 'calc(100% - 70px)',
            maxWidth: '400px',
            borderRadius: '50px'
          }}
        >
          올킬 제출
        </Button>
      </div>
    </div>
  );
};

export default TodayTeamSelection;
