
import React, { useState } from 'react';

interface TeamInfo {
  name: string;
  logo: string;
  votes: number;
}

interface GameInfo {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  time: string;
  status: string;
}

const games: GameInfo[] = [
  {
    homeTeam: {
      name: 'KT',
      logo: 'https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg',
      votes: 1941
    },
    awayTeam: {
      name: 'LG',
      logo: 'https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg',
      votes: 3304
    },
    time: '18:00',
    status: '투표 중'
  },
  {
    homeTeam: {
      name: '한화',
      logo: 'https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg',
      votes: 4720
    },
    awayTeam: {
      name: 'NC',
      logo: 'https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg',
      votes: 524
    },
    time: '18:00',
    status: '투표 중'
  },
  {
    homeTeam: {
      name: '두산',
      logo: 'https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg',
      votes: 0
    },
    awayTeam: {
      name: '삼성',
      logo: 'https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg',
      votes: 5245
    },
    time: '18:00',
    status: '투표 중'
  },
  {
    homeTeam: {
      name: 'KIA',
      logo: 'https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg',
      votes: 4458
    },
    awayTeam: {
      name: 'SSG',
      logo: 'https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg',
      votes: 787
    },
    time: '18:00',
    status: '투표 중'
  },
  {
    homeTeam: {
      name: '키움',
      logo: 'https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2yUy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg',
      votes: 787
    },
    awayTeam: {
      name: '롯데',
      logo: 'https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg',
      votes: 4458
    },
    time: '18:00',
    status: '투표 중'
  }
];

const TeamBox: React.FC<{
  team: TeamInfo;
  isSelected: boolean;
  onSelect: () => void;
  isHigherVotes: boolean;
}> = ({ team, isSelected, onSelect, isHigherVotes }) => {
  return (
    <div className="team-column">
      <div 
        className={`team-box ${isSelected ? 'selected' : ''}`}
        onClick={onSelect}
      >
        <img src={team.logo} alt={team.name} className="team-logo" />
        <div className="team-name">{team.name}</div>
      </div>
      <div className={`vote-count ${isHigherVotes ? 'higher' : 'lower'}`}>
        {team.votes.toLocaleString()}
      </div>
    </div>
  );
};

export const TeamSelectionSection: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<Record<number, 'home' | 'away' | null>>({});

  const handleSelectTeam = (gameIndex: number, side: 'home' | 'away') => {
    setSelectedTeams(prev => ({
      ...prev,
      [gameIndex]: side
    }));
  };

  return (
    <div className="h-full w-full bg-[#121212]">
      <h2 className="team-selection-title">올킬 도전!</h2>
      <div className="game-list">
        {games.map((game, index) => {
          const homeHigherVotes = game.homeTeam.votes > game.awayTeam.votes;
          return (
            <div key={index} className="game-item">
              <TeamBox 
                team={game.homeTeam}
                isSelected={selectedTeams[index] === 'home'}
                onSelect={() => handleSelectTeam(index, 'home')}
                isHigherVotes={homeHigherVotes}
              />
              <div className="game-status">
                <div className="voting-text">{game.status}</div>
                <div className="game-time">{game.time}</div>
              </div>
              <TeamBox 
                team={game.awayTeam}
                isSelected={selectedTeams[index] === 'away'}
                onSelect={() => handleSelectTeam(index, 'away')}
                isHigherVotes={!homeHigherVotes}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
