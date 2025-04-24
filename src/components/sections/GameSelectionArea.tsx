
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

  const TeamButton = ({ team, isSelected, onClick }: { team: Team; isSelected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
        isSelected ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
      )}
    >
      <img src={team.logo} alt={team.name} className="w-6 h-6" />
      <span>{team.name}</span>
    </button>
  );

  const GameRow = ({ game }: { game: Game }) => {
    const selectedTeam = selectedTeams[game.id];
    
    return (
      <div className="h-[130px] flex items-center justify-between px-4 border-b border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <TeamButton
            team={game.homeTeam}
            isSelected={selectedTeam?.id === game.homeTeam.id}
            onClick={() => handleTeamSelect(game.id, game.homeTeam)}
          />
          <span className="text-sm text-gray-500">{game.homeTeam.voteCount}표</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-gray-600">{game.status}</span>
          <span className="text-sm text-gray-500">{game.time || game.score}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <TeamButton
            team={game.awayTeam}
            isSelected={selectedTeam?.id === game.awayTeam.id}
            onClick={() => handleTeamSelect(game.id, game.awayTeam)}
          />
          <span className="text-sm text-gray-500">{game.awayTeam.voteCount}표</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[30px]">
      <h2 className="text-[30px] font-bold text-center mb-[30px]">올킬 도전!</h2>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
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
