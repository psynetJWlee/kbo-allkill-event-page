
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import GameItem from '@/components/GameItem';

// KBO team logo URLs
const teamLogos = {
  "KT": "https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg",
  "LG": "https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg",
  "한화": "https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg",
  "두산": "https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg",
  "KIA": "https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg",
  "키움": "https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2yUy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg",
  "NC": "https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg",
  "삼성": "https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg",
  "SSG": "https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg",
  "롯데": "https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg"
};

// KBO 팀 경기 데이터
const kboGames: GameType[] = [
  {
    id: 0,
    homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 },
    awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 1,
    homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 },
    awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 2,
    homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0 },
    awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 3,
    homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 },
    awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787 },
    time: "18:00",
    status: "투표 중"
  },
  {
    id: 4,
    homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787 },
    awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 },
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
    <section className="team-selection-section" id="team-selection-section">
      <h2 className="team-selection-title">올킬 도전!</h2>
      <div className="game-list" id="game-list">
        {kboGames.map(game => (
          <GameItem
            key={game.id}
            game={game}
            selectedSide={selected[game.id]}
            onTeamSelect={handleTeamSelect}
          />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <Button 
          className={`submit-btn ${isAllSelected ? 'enabled' : ''}`} 
          disabled={!isAllSelected}
          id="submit-allkill-btn"
          style={{ 
            backgroundColor: isAllSelected ? 'rgba(255, 215, 0, 1)' : 'rgba(255, 215, 0, 0.3)',
            color: '#121212',
            fontSize: '24px',
            fontWeight: 'bold',
            height: '50px',
            width: 'calc(100% - 70px)',
            maxWidth: '400px',
            margin: '32px auto',
            borderRadius: '4px'
          }}
        >
          올킬 제출
        </Button>
      </div>
    </section>
  );
};

export default TeamSelectionSection;
