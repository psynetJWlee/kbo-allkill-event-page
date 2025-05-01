
import React, { useState, useEffect } from 'react';
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

// Game results data for yesterday and today views
const gameResults = [
  {
    homeTeam: { name: "KT", logo: teamLogos.KT, score: 11 },
    awayTeam: { name: "LG", logo: teamLogos.LG, score: 5 },
    status: "종료",
    userCorrect: true
  },
  {
    homeTeam: { name: "한화", logo: teamLogos["한화"], score: 3 },
    awayTeam: { name: "NC", logo: teamLogos.NC, score: 7 },
    status: "경기 중",
    userCorrect: false
  },
  {
    homeTeam: { name: "두산", logo: teamLogos["두산"], score: 2 },
    awayTeam: { name: "삼성", logo: teamLogos["삼성"], score: 2 },
    status: "종료",
    userCorrect: true
  },
  {
    homeTeam: { name: "KIA", logo: teamLogos.KIA, score: 6 },
    awayTeam: { name: "SSG", logo: teamLogos.SSG, score: 3 },
    status: "종료",
    userCorrect: false
  },
  {
    homeTeam: { name: "키움", logo: teamLogos["키움"], score: 0 },
    awayTeam: { name: "롯데", logo: teamLogos["롯데"], score: 8 },
    status: "종료",
    userCorrect: false
  }
];

const TeamSelectionSection: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [buttonRendered, setButtonRendered] = useState(false);

  // Effect to ensure button is ready for vanilla JS to find
  useEffect(() => {
    // Signal to vanilla JS that React has rendered the button
    const button = document.getElementById('submit-allkill-btn');
    if (button) {
      button.dataset.reactRendered = 'true';
      setButtonRendered(true);
      
      // Create a custom event to notify vanilla JS that React has rendered the button
      const event = new CustomEvent('react-rendered', { detail: { elementId: 'submit-allkill-btn' } });
      document.dispatchEvent(event);
      
      console.log('React: Submit button rendered and event dispatched');
    }
  }, []);

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
      
      {/* Main team selection UI - Default state */}
      <div className="state-tomorrow" id="state-default">
        <div className="game-list" id="game-list">
          {kboGames.map((game, index) => (
            <GameItem
              key={game.id}
              game={game}
              selectedSide={selected[game.id]}
              onTeamSelect={handleTeamSelect}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Today's result state */}
      <div className="state-today" id="state-today">
        <div className="match-results-container">
          {gameResults.map((result, index) => (
            <div key={index} className="match-result-wrapper">
              <div className="match-result">
                <span className={`score home ${result.homeTeam.score > result.awayTeam.score ? 'winner' : 'loser'}`}>
                  {result.homeTeam.score}
                </span>
                <span className="vs">vs</span>
                <span className={`score away ${result.awayTeam.score > result.homeTeam.score ? 'winner' : 'loser'}`}>
                  {result.awayTeam.score}
                </span>
              </div>
              <div className="match-status">{result.status}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Yesterday's result state */}
      <div className="state-yesterday" id="state-yesterday">
        <div className="match-results-container">
          {gameResults.map((result, index) => (
            <div key={index} className="match-result-wrapper">
              <div className="match-result">
                <span className={`score home ${result.homeTeam.score > result.awayTeam.score ? 'winner' : 'loser'} ${result.userCorrect ? 'correct' : ''}`}>
                  {result.homeTeam.score}
                </span>
                <span className="vs">vs</span>
                <span className={`score away ${result.awayTeam.score > result.homeTeam.score ? 'winner' : 'loser'} ${result.userCorrect ? 'correct' : ''}`}>
                  {result.awayTeam.score}
                </span>
              </div>
              <div className="match-status">{result.status}</div>
            </div>
          ))}
        </div>
        <div className="stamp-container">
          <img className="stamp-image" src="/lovable-uploads/46e10f18-b741-49e5-809e-500ae37ffbd7.png" alt="올킬 도장" />
        </div>
      </div>
      
      <div className="w-full flex justify-center">
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
            margin: '32px auto 0',
            borderRadius: '50px'
          }}
        >
          올킬 제출
        </Button>
      </div>
    </section>
  );
};

export default TeamSelectionSection;
