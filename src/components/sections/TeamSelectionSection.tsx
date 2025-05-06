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

// Yesterday's game results data
const yesterdayResults = [
  {
    id: 0,
    homeTeam: { name: "KT", logo: teamLogos.KT, votes: 11, winner: true },
    awayTeam: { name: "LG", logo: teamLogos.LG, votes: 5, winner: false },
    homeScore: 11,
    awayScore: 5,
    status: "종료",
    correct: true
  },
  {
    id: 1,
    homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 7, winner: true },
    awayTeam: { name: "NC", logo: teamLogos.NC, votes: 2, winner: false },
    homeScore: 7,
    awayScore: 2,
    status: "종료",
    correct: true
  },
  {
    id: 2,
    homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 3, winner: false },
    awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 9, winner: true },
    homeScore: 3,
    awayScore: 9,
    status: "종료",
    correct: true
  },
  {
    id: 3,
    homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 8, winner: true },
    awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 4, winner: false },
    homeScore: 8,
    awayScore: 4,
    status: "종료",
    correct: true
  },
  {
    id: 4,
    homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 5, winner: false },
    awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 10, winner: true },
    homeScore: 5,
    awayScore: 10,
    status: "종료",
    correct: true
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
    <section id="team-selection-section">
      {/* Today's Team Selection Section */}
      <div className="team-selection-section flex flex-col gap-4" id="team-selection-section-today">
        <h2 className="team-selection-title">올킬 도전!</h2>
        <div className="game-list flex flex-col gap-2" id="game-list">
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
      
      {/* Yesterday's Result Section - Updated to match Today's layout */}
      <div className="team-selection-section flex flex-col gap-4" id="state-yesterday">
        <h2 className="team-selection-title">올킬 결과</h2>
        <div className="game-list flex flex-col gap-2" id="yesterday-game-list">
          {yesterdayResults.map((result, index) => (
            <div key={result.id} className={`match-result relative px-4 ${index % 2 === 0 ? 'alternate-bg' : ''}`}>
              <div className="team-column flex-none">
                <div className={`team-box ${result.homeTeam.winner ? 'selected-home selected' : ''}`}>
                  <img className="team-logo" src={result.homeTeam.logo} alt={`${result.homeTeam.name} 로고`} />
                  <span className="team-name">{result.homeTeam.name}</span>
                </div>
                <div className={`vote-count ${result.homeTeam.winner ? 'higher' : 'lower'}`}>
                  {result.homeTeam.votes}
                </div>
              </div>
              
              <div className="game-status flex-1 flex flex-col items-center justify-center">
                <div className="score-line">
                  <span className={`score home ${result.homeTeam.winner ? 'winner' : ''}`}>{result.homeScore}</span>
                  <span className="vs">vs</span>
                  <span className={`score away ${result.awayTeam.winner ? 'winner' : ''}`}>{result.awayScore}</span>
                </div>
                <div className="match-status">{result.status}</div>
              </div>
              
              <div className="team-column flex-none text-right">
                <div className={`team-box ${result.awayTeam.winner ? 'selected-away selected' : ''}`}>
                  <img className="team-logo" src={result.awayTeam.logo} alt={`${result.awayTeam.name} 로고`} />
                  <span className="team-name">{result.awayTeam.name}</span>
                </div>
                <div className={`vote-count ${result.awayTeam.winner ? 'higher' : 'lower'}`}>
                  {result.awayTeam.votes}
                </div>
              </div>
              
              {result.correct && (
                <img
                  src="https://drive.google.com/drive-viewer/AKGpihY6GXHjBvFEohaA0_swoa2JMoqUFZj__hDIlSnZ9UuTIAOYbsIZ4hs-QUWvgZzPkA0LY7XbmYA28qdHs7utdClvtMdKjhqvzMk=w1920-h911"
                  alt="정답 동그라미"
                  className="correct-circle absolute w-[125px] h-[130px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Updated footer positioning to be static rather than absolute */}
        <div className="yesterday-footer w-full flex flex-col items-center mt-[50px] mb-[50px]">
          <img
            src="https://drive.google.com/drive-viewer/AKGpiha1qvAUHn91M3Aw05FgKItLa7Il5pIHp-xVxp0jON2OGCIDz5zb4wXgA5e0h_J4hYPp1E4nCzo9N0lBoDP_AzKhKDOtHgy0xsU=w1920-h911"
            alt="올킬 도장"
            className="stamp-image mb-4 w-[338px] h-[290px]"
          />
          <Button 
            className="submit-btn mx-auto" 
            id="yesterday-allkill-btn"
            style={{ 
              backgroundColor: '#FFD700',
              color: '#121212',
              fontSize: '24px',
              fontWeight: 'bold',
              height: '68px',
              width: 'calc(100% - 70px)',
              maxWidth: '400px',
              borderRadius: '50px'
            }}
          >
            올킬 성공!
          </Button>
        </div>
      </div>
      
      {/* Placeholder for team selection section when navigating to previous date */}
      <div className="team-selection-placeholder" id="team-selection-placeholder">
        {/* Empty placeholder with same height as the team selection section */}
      </div>
    </section>
  );
};

export default TeamSelectionSection;
