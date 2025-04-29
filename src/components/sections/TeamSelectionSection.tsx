
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import GameItem from '@/components/GameItem';

// KBO 팀 경기 데이터
const kboGames: GameType[] = [
  {
    id: 0,
    homeTeam: { name: "KT", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 1941 },
    awayTeam: { name: "LG", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 3304 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 1,
    homeTeam: { name: "한화", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 4720 },
    awayTeam: { name: "NC", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 524 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 2,
    homeTeam: { name: "두산", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 0 },
    awayTeam: { name: "삼성", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 5245 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 3,
    homeTeam: { name: "KIA", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 4458 },
    awayTeam: { name: "SSG", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 787 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 4,
    homeTeam: { name: "키움", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 787 },
    awayTeam: { name: "롯데", logo: "/lovable-uploads/002a6d45-b04a-4f1a-8746-e3311b000494.png", votes: 4458 },
    time: "18:00",
    status: "투표 중"
  }
];

const TeamSelectionSection: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});

  const handleTeamSelect = (gameId: number, team: 'home' | 'away') => {
    setSelected(prev => ({
      ...prev,
      [gameId]: team
    }));
  };

  const isAllSelected = Object.keys(selected).length === 5;

  return (
    <section className="team-selection-section">
      <h2 className="team-selection-title">올킬 도전!</h2>
      <div className="game-list">
        {kboGames.map(game => (
          <GameItem
            key={game.id}
            game={game}
            selectedSide={selected[game.id]}
            onTeamSelect={handleTeamSelect}
          />
        ))}
      </div>
      <Button 
        className={`submit-btn ${isAllSelected ? 'enabled' : ''}`} 
        disabled={!isAllSelected}
      >
        올킬 제출
      </Button>
    </section>
  );
};

export default TeamSelectionSection;
