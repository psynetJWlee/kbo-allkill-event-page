
import React, { useState } from 'react';
import { Game, Team } from '@/types/game';
import { MOCK_GAMES } from '@/constants/teams';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const GameSelectionArea = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<number, Team>>({});
  const games = MOCK_GAMES;

  const handleTeamSelect = (gameId: number, team: Team) => {
    setSelectedTeams(prev => ({
      ...prev,
      [gameId]: team
    }));
  };

  const isAllSelected = Object.keys(selectedTeams).length === games.length;

  const TeamBox = ({ team, isSelected, onClick, voteCount }: { 
    team: Team; 
    isSelected: boolean; 
    onClick: () => void;
    voteCount: number;
  }) => (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={cn(
          "w-[80px] h-[80px] flex flex-col items-center justify-center bg-[#121212] border border-gray-700 rounded-md",
          isSelected && "border-[#F97316]"
        )}
      >
        <img src={team.logo} alt={team.name} className="w-10 h-10" />
        <span className="text-white mt-1">{team.name}</span>
      </button>
      <span className={cn(
        "text-sm mt-1", 
        voteCount > 0 ? "text-[#F97316]" : "text-white"
      )}>
        {voteCount.toLocaleString()}
      </span>
    </div>
  );

  const GameRow = ({ game }: { game: Game }) => {
    const selectedTeam = selectedTeams[game.id];
    
    return (
      <div className="h-[130px] flex items-center justify-between px-4 border-b border-gray-800">
        <TeamBox
          team={game.homeTeam}
          isSelected={selectedTeam?.id === game.homeTeam.id}
          onClick={() => handleTeamSelect(game.id, game.homeTeam)}
          voteCount={game.homeTeam.voteCount}
        />

        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-white">{game.status}</span>
          <span className="text-sm text-white mt-1">{game.time || game.score}</span>
        </div>

        <TeamBox
          team={game.awayTeam}
          isSelected={selectedTeam?.id === game.awayTeam.id}
          onClick={() => handleTeamSelect(game.id, game.awayTeam)}
          voteCount={game.awayTeam.voteCount}
        />
      </div>
    );
  };

  return (
    <div className="mt-[30px]">
      <h2 className="text-[30px] font-bold text-center mb-[30px] text-white">올킬 도전!</h2>
      
      <div className="border-t border-b border-gray-800">
        {games.map(game => (
          <GameRow key={game.id} game={game} />
        ))}
      </div>

      <Button
        disabled={!isAllSelected}
        className={cn(
          "w-[284px] h-[68px] rounded-[50px] mt-[20px] mx-auto block bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold",
          !isAllSelected && "opacity-30"
        )}
      >
        올킬 제출
      </Button>
    </div>
  );
};
