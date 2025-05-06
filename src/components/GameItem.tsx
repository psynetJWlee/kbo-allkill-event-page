// src/components/GameItem.tsx

import React from 'react';
import TeamBox from './TeamBox';
import { GameType } from '@/types/game';

interface GameItemProps {
  game: GameType;
  selectedSide?: string;
  onTeamSelect: (gameId: number, team: 'home' | 'away') => void;
  index: number;
  showTime?: boolean;
}

const GameItem: React.FC<GameItemProps> = ({
  game,
  selectedSide,
  onTeamSelect,
  index,
  showTime = false
}) => {
  const { id, homeTeam, awayTeam, time, status } = game;
  const isAlternateBackground = index % 2 === 0;

  return (
    <div
      className={`relative game-item flex items-center px-4 flex-1 ${
        isAlternateBackground ? 'alternate-bg' : ''
      }`}
      data-index={id}
    >
      {/* 1️⃣ overlay */}
      {index === 0 && (
        <img
          src="https://lh3.googleusercontent.com/fife/ALs6j_EV1WqEBlW5SdrJu2bV833HvtEg-RZAoGxsUf-v536Cdp8kK_fWCq6MHRd7xJQix9uDGp_H5F8KTGigSMQOB1zf-Fr8BFfpaei5fc9GAgymjStFO0BXh3dpGkrcW9lfWek-Q318wJnO9gatIBs4Zz8adwh3dW7C7V9svtIlJ4LnVWfEbt7Xb1dK9GiL_gNFos9IdIkQHELk5NQv1xu5pii__utSfdeGHV74VWYo1_56QSzLoYkM3z48_Z1H4E1vleGWdevLIa0daJKCmBF4sYuvzrzRJ_6CBfX1oi7XPux4_ZmYgxYI5JkENC7NghIBuEfjq7l_w10N5Idw7aPo1flG4WUnlk6GUXdghFmr2N9LwQdItvUBJjTLALgaj0MOS59yo8N4pXqfDXy1CcSjTGKJy6VllrtoyZU2hpqdKDio1gWeDo5FhkzV6zdlHNyO55cX5h663OAhauzrIWBXQmwGdEK6D5TD7uPa6pfp57a6USDufwqQn_3uFCj_5AMEsphWi9lnfKSzEuAOskoLkTLKLae4nJ8Yl3lQcp5tLHmfAa_LlGo4RRWEmvzuY9CN5YgrXQN9cwfz-GIv2XDkT4nBhumFBuAP1Vy2T9n0KUZKRX4ZjEPy1oPH3Q8jdXWmQzfYLp5SnNDCC8qibyFdcFaw2ONT4pLN84aE1nOZxs6CIoqvKcgON-y2t0Qk1eSE7oMafs68XBsE7lSuuumLkPLSG4GrAS5CioZ4n4tvfyk40WgNSHhcRQW-SMSPKWZQdfKKO98ujNEX8UnTaOkiE3iFmZm-RIetC0oRS3v0slow-EnN_gOoT2F7W_A7dJItzN4VVKdBc45aOLNngfm2qP8AJPeLizPhKmn0JmEIZLQw3vyvLLW0RQ-k06PZi_xXUmETIdacO9SfsWYayBgfv-qe8SL3X1SJbJhT8kUK40AbOA8BeyPI3eNFptYCfvqnh1aMl1XImRQ4Hb8y8Em6vEG6eiyNK9sD__LXsZGP7qVJ_oOB3DZ272GT_wWGAUbj4BdL9wWDHXkGzUwlx6uRfVDgBN8b4LgIjnw_EIqrS5dAaXz-lPAd96XMzZt2KxU63ybgttWtbNEu3FCmnO3stzK2w3xIyDQC8r1x_vTP4_lPOk2mLmSSp5mZ5u6OTfJI8TBMq91DXLYy1IqU5rPsAL1MVZ7R7NDl2miIwtt_j36Wj2cbium3jxDCdOEoR3SMaF2oQBMZxXXeE08bxsN7GDTEkhRZxEjCb8MG9MHRbhMKW5s9aTdyu6BAJjXPuXEvNDMS_ImxapOPnwuK5xpjlzl2Leunp5cBLaQXPsk0gH4V29hrwLSeo5xQkYs4rp_yZPoBpluknBS2Kuju-7rsLJGloDzqf6OIJZlREGoNHmcVQ8n1P-sJlu7wYdsUv7Cl5K5x0fc8E_BklQcZUp9xicwylM1oBORVc-65zJ3WOMiv58yGpcb4D87aUnPZQkVhHqe2kS0qxjkldOHcjf40s0eMJPw4eS7nIgUzi1N6s5gAoZzzjt7blD9Bfd_BV6PLA8G97Zc_mORVQETwp1B4EJb58P5yFYYXZiBO3bGU1NNAqDqnBqEgvVlLYdZalFGtYx7xmJn7Di7-aJzI0B9M3hY=w1902-h910"
          alt="첫 번째 경기 강조 원"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
      )}

      {/* 왼쪽 팀 */}
      <div className="team-column flex justify-start flex-none">
        <TeamBox
          team={homeTeam}
          side="home"
          isSelected={selectedSide === 'home'}
          onClick={() => onTeamSelect(id, 'home')}
        />
        <div className={`vote-count ${homeTeam.votes >= awayTeam.votes ? 'higher' : 'lower'}`}>
          {homeTeam.votes.toLocaleString()}
        </div>
      </div>

      {/* 가운데 점수 vs 점수 / 경기 상태 */}
      <div className="game-status flex-1 flex flex-col items-center justify-center">
        {showTime ? (
          <>
            <div className="score-container flex items-center">
              <span className={`score text-[30px] ${homeTeam.votes > awayTeam.votes ? 'text-[#FFC736]' : 'text-[#FFFFFF]'}`}>
                {homeTeam.votes}
              </span>
              <span className="vs text-[15px] text-[#555555] mx-1">vs</span>
              <span className={`score text-[30px] ${awayTeam.votes > homeTeam.votes ? 'text-[#FFC736]' : 'text-[#FFFFFF]'}`}>
                {awayTeam.votes}
              </span>
            </div>
            <span className="match-status text-[14px] text-[#FFFFFF] mt-1">{status}</span>
          </>
        ) : (
          <>
            <div className="voting-text">{status}</div>
            <div className="game-time">{time}</div>
          </>
        )}
      </div>     
      {/* 오른쪽 팀 */}
      <div className="team-column flex justify-end flex-none text-right">
        <TeamBox
          team={awayTeam}
          side="away"
          isSelected={selectedSide === 'away'}
          onClick={() => onTeamSelect(id, 'away')}
        />
        <div className={`vote-count ${awayTeam.votes >= homeTeam.votes ? 'higher' : 'lower'}`}>
          {awayTeam.votes.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default GameItem;
