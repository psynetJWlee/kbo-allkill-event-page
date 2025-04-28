import React, { useState } from 'react';
import { DateNavigation } from '@/components/DateNavigation';
import { TeamBox } from '@/components/team/TeamBox';

interface TeamSelectionSectionProps {
  currentDay: number;
  realToday: number;
  onPrevDate: () => void;
  onNextDate: () => void;
  onDateClick: (day: number) => void;
}

export const TeamSelectionSection = ({
  currentDay,
  realToday,
  onPrevDate,
  onNextDate,
  onDateClick
}: TeamSelectionSectionProps) => {
  const [selectedTeams, setSelectedTeams] = useState<Array<{home: boolean, away: boolean}>>(
    new Array(5).fill({ home: false, away: false })
  );

  const handleTeamSelect = (gameIndex: number, side: 'home' | 'away') => {
    setSelectedTeams(prev => {
      const newTeams = [...prev];
      newTeams[gameIndex] = {
        home: side === 'home',
        away: side === 'away'
      };
      return newTeams;
    });
  };

  const allTeamsSelected = selectedTeams.every(game => game.home || game.away);

  return (
    <section className="h-[912px] w-full bg-[#121212]">
      <DateNavigation 
        currentDay={currentDay}
        realToday={realToday}
        onPrevDate={onPrevDate}
        onNextDate={onNextDate}
        onDateClick={onDateClick}
      />
      
      <h2 className="text-center text-[30px] font-bold text-white pt-[30px] mb-[30px]">
        올킬 도전!
      </h2>

      <div className="flex flex-col gap-0 px-4">
        <TeamBox
          homeTeam={{
            name: "KT",
            logo: "https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg",
            voteCount: 1941
          }}
          awayTeam={{
            name: "LG",
            logo: "https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg",
            voteCount: 3304
          }}
          gameTime="18:00"
          isSelected={selectedTeams[0]}
          onSelect={(side) => handleTeamSelect(0, side)}
        />
        <TeamBox
          homeTeam={{
            name: "한화",
            logo: "https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg",
            voteCount: 4720
          }}
          awayTeam={{
            name: "NC",
            logo: "https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg",
            voteCount: 524
          }}
          gameTime="18:00"
          isSelected={selectedTeams[1]}
          onSelect={(side) => handleTeamSelect(1, side)}
        />
        <TeamBox
          homeTeam={{
            name: "두산",
            logo: "https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg",
            voteCount: 0
          }}
          awayTeam={{
            name: "삼성",
            logo: "https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg",
            voteCount: 5245
          }}
          gameTime="18:00"
          isSelected={selectedTeams[2]}
          onSelect={(side) => handleTeamSelect(2, side)}
        />
        <TeamBox
          homeTeam={{
            name: "KIA",
            logo: "https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg",
            voteCount: 4458
          }}
          awayTeam={{
            name: "SSG",
            logo: "https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg",
            voteCount: 787
          }}
          gameTime="18:00"
          isSelected={selectedTeams[3]}
          onSelect={(side) => handleTeamSelect(3, side)}
        />
        <TeamBox
          homeTeam={{
            name: "키움",
            logo: "https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2yUy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg",
            voteCount: 787
          }}
          awayTeam={{
            name: "롯데",
            logo: "https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg",
            voteCount: 4458
          }}
          gameTime="18:00"
          isSelected={selectedTeams[4]}
          onSelect={(side) => handleTeamSelect(4, side)}
        />
      </div>

      <button 
        className={`w-[284px] h-[68px] mx-auto mt-5 block rounded-[10px] text-xl font-bold transition-opacity duration-300
          ${allTeamsSelected 
            ? 'bg-[#FFD700] text-black opacity-100 cursor-pointer' 
            : 'bg-[#FFD700] text-black opacity-30 cursor-not-allowed'}`}
      >
        올킬 제출
      </button>
    </section>
  );
};
