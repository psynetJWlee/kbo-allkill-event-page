import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import GameItem from '@/components/GameItem';
import GameResultItem from '@/components/GameResultItem';

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

// KBO 팀 경기 데이터 (내일)
const kboGames: GameType[] = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, time: "18:00", status: "투표 중" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, time: "18:00", status: "투표 중" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0    }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, time: "18:00", status: "투표 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787  }, time: "18:00", status: "투표 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787  }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, time: "18:00", status: "투표 중" }
];

// Today's game results data
const todayResults = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, homeScore: 1, awayScore: 5, status: "종료" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, homeScore: 2, awayScore: 3, status: "종료" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0    }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, homeScore: 4, awayScore: 4, status: "경기 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787  }, homeScore: 10, awayScore: 2, status: "경기 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787  }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, homeScore: 1, awayScore: 0, status: "경기 중" }
];

// Default selected teams for today view (기본 선택된 팀들)
const defaultSelectedTeams = {
  0: 'home', // KT
  1: 'away', // NC
  2: 'away', // 삼성
  3: 'home', // KIA
  4: 'home'  // 키움
};

// Yesterday's game results data
const yesterdayResults = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 11, winner: true }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 5, winner: false }, homeScore: 11, awayScore: 5, status: "종료", correct: true },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 7,  winner: true }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 2, winner: false }, homeScore: 7,  awayScore: 2, status: "종료", correct: true },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 3,  winner: false }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 9, winner: true  }, homeScore: 3,  awayScore: 9, status: "종료", correct: true },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 8,  winner: true }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 4, winner: false }, homeScore: 8,  awayScore: 4, status: "종료", correct: true },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 5,  winner: false }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 10,winner: true  }, homeScore: 5,  awayScore: 10,status: "종료", correct: true }
];

const TeamSelectionSection: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [buttonRendered, setButtonRendered] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(26); // Default to "Today" (26)

  // Effect to ensure button is ready for vanilla JS to find
  useEffect(() => {
    const button = document.getElementById('submit-allkill-btn');
    if (button) {
      button.dataset.reactRendered = 'true';
      setButtonRendered(true);
      const event = new CustomEvent('react-rendered', { detail: { elementId: 'submit-allkill-btn' } });
      document.dispatchEvent(event);
    }
  }, []);

  // Effect to set default selected teams for today view
  useEffect(() => {
    if (currentDay === 26) { // Today
      setSelected(defaultSelectedTeams);
    } else {
      setSelected({}); // Reset selections for other days
    }
  }, [currentDay]);

  const handleTeamSelect = (gameId: number, team: 'home' | 'away') => {
    setSelected(prev => ({ ...prev, [gameId]: team }));
  };

  const isAllSelected = Object.keys(selected).length === kboGames.length;

  // Handle date navigation
  const handleDateChange = (day: number) => {
    setCurrentDay(day);
  };

  // Determine which button text to show
  const getButtonText = () => {
    if (currentDay === 26) { // Today
      return "2경기 성공! 채점 중";
    } else {
      return "올킬 제출";
    }
  };

  return (
    <section id="team-selection-section">
      {/* Date Navigation */}
      <div className="date-navigation flex items-center justify-between px-[21px] h-[50px] text-white">
        <div 
          className="flex items-center cursor-pointer date-nav-prev" 
          onClick={() => handleDateChange(currentDay - 1)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-[15px] h-[15px] border-y-[7.5px] border-y-transparent border-r-[10px] border-r-white"></div>
          </div>
          <span className="text-[16px] ml-[18px]" id="prev-day">{currentDay - 1}</span>
        </div>
        
        <span 
          className="text-[16px] font-bold cursor-pointer" 
          id="current-day"
          onClick={() => handleDateChange(26)} // Click on Today to go back to today
        >
          {currentDay === 26 ? 'Today' : currentDay}
        </span>
        
        <div 
          className="flex items-center cursor-pointer date-nav-next"
          onClick={() => handleDateChange(currentDay + 1)}
        >
          <span className="text-[16px] mr-[18px]" id="next-day">{currentDay + 1}</span>
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-[15px] h-[15px] border-y-[7.5px] border-y-transparent border-l-[10px] border-l-white"></div>
          </div>
        </div>
      </div>

      {/* Tomorrow's Team Selection Section (27) */}
      {currentDay === 27 && (
        <div className="team-selection-section flex flex-col gap-4" id="team-selection-section-tomorrow">
          <h2 className="team-selection-title flex items-center justify-center">
            <img 
              src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
              alt="Pointing finger left" 
              className="w-[60px] h-[60px] mr-[15px]"
            />
            올킬 도전!
            <img 
              src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
              alt="Pointing finger right" 
              className="w-[60px] h-[60px] ml-[15px]"
            />
          </h2>
          <div className="game-list flex flex-col gap-2" id="game-list">
            {kboGames.map((game, index) => (
              <GameItem
                key={game.id}
                game={game}
                selectedSide={selected[game.id]}
                onTeamSelect={handleTeamSelect}
                index={index}
                showTime={true}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div id="team-selection-submit" className="mt-auto mb-[30px] flex justify-center">
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
              {getButtonText()}
            </Button>
          </div>
        </div>
      )}

      {/* Today's Game Results Section (26) */}
      {currentDay === 26 && (
        <div className="team-selection-section flex flex-col gap-4" id="team-selection-section-today">
          <h2 className="team-selection-title flex items-center justify-center">
            <img 
              src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
              alt="Pointing finger left" 
              className="w-[60px] h-[60px] mr-[15px]"
            />
            올킬 도전!
            <img 
              src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
              alt="Pointing finger right" 
              className="w-[60px] h-[60px] ml-[15px]"
            />
          </h2>
          <div className="game-list flex flex-col gap-2" id="game-list">
            {todayResults.map((game, index) => (
              <GameResultItem
                key={game.id}
                game={game}
                selectedSide={selected[game.id]}
                onTeamSelect={handleTeamSelect}
                index={index}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div id="team-selection-submit" className="mt-auto mb-[30px] flex justify-center">
            <Button
              className="submit-btn mx-auto"
              id="submit-allkill-btn"
              data-rendered-by="react"
              data-ready={buttonRendered.toString()}
              style={{
                backgroundColor: '#FFD700',
                fontSize: '24px',
                fontWeight: 'bold',
                height: '68px',
                width: 'calc(100% - 70px)',
                maxWidth: '400px',
                borderRadius: '50px',
                color: '#121212',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px'
              }}
            >
              <span>2경기 성공!</span>
              <span>채점 중</span>
            </Button>
          </div>
        </div>
      )}

      {/* Yesterday's Result Section */}
      {currentDay === 25 && (
        <div className="team-selection-section flex flex-col gap-4" id="state-yesterday">
          <h2 className="team-selection-title flex items-center justify-center">
            <img 
              src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
              alt="Pointing finger left" 
              className="w-[60px] h-[60px] mr-[15px]"
            />
            올킬 결과
            <img 
              src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
              alt="Pointing finger right" 
              className="w-[60px] h-[60px] ml-[15px]"
            />
          </h2>
          <div className="game-list flex flex-col gap-2" id="yesterday-game-list">
            {yesterdayResults.map((result, index) => (
              <div key={result.id} className={`match-result relative px-4 ${index % 2 === 0 ? 'alternate-bg' : ''}`}>
                {/* ... 원본과 동일 ... */}
              </div>
            ))}
          </div>
          <div className="yesterday-footer w-full flex flex-col items-center mt-[50px] mb-[50px]">
            {/* ... 원본과 동일 ... */}
          </div>
        </div>
      )}

      {/* Placeholder for other dates */}
      {(currentDay < 25 || currentDay > 27) && (
        <div className="team-selection-placeholder" id="team-selection-placeholder">
          <div className="flex justify-center items-center h-[400px] text-white text-lg">
            이 날짜의 데이터가 없습니다.
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSelectionSection;
