
import React from 'react';

interface TeamData {
  name: string;
  logo: string;
  voteCount: number;
}

interface TeamBoxProps {
  homeTeam: TeamData;
  awayTeam: TeamData;
  gameTime: string;
  isSelected: {
    home: boolean;
    away: boolean;
  };
  onSelect: (side: 'home' | 'away') => void;
}

export const TeamBox = ({
  homeTeam,
  awayTeam,
  gameTime,
  isSelected,
  onSelect
}: TeamBoxProps) => {
  return (
    <div className="h-40 flex justify-around items-center relative gap-5">
      <div className="flex flex-col items-center">
        <button
          onClick={() => onSelect('home')}
          className={`w-[90px] h-[90px] rounded-[10px] flex flex-col items-center justify-center transition-all duration-300
            ${isSelected.home 
              ? 'bg-[#C13D3D] border-[3px] border-[#FFFFFF]' 
              : 'border border-[#545454]'}`}
        >
          <img 
            src={homeTeam.logo} 
            alt={homeTeam.name} 
            className="w-[45px] h-[45px] mb-2"
          />
          <span className="text-white text-sm">{homeTeam.name}</span>
        </button>
        <span className={`mt-2 text-xl min-w-[70px] text-center
          ${homeTeam.voteCount > awayTeam.voteCount 
            ? 'text-[#FFC736] font-bold' 
            : 'text-white/70'}`}
        >
          {homeTeam.voteCount.toLocaleString()}
        </span>
      </div>

      <div className="text-center">
        <p className={`text-[15px] font-bold mb-[5px] 
          ${isSelected.home || isSelected.away 
            ? 'text-white' 
            : 'text-white/70'}`}
        >
          투표 중
        </p>
        <p className={`text-[14px] font-bold
          ${isSelected.home || isSelected.away 
            ? 'text-white' 
            : 'text-white/70'}`}
        >
          {gameTime}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={() => onSelect('away')}
          className={`w-[90px] h-[90px] rounded-[10px] flex flex-col items-center justify-center transition-all duration-300
            ${isSelected.away 
              ? 'bg-[#047DBF] border-[3px] border-[#FFFFFF]' 
              : 'border border-[#545454]'}`}
        >
          <img 
            src={awayTeam.logo} 
            alt={awayTeam.name} 
            className="w-[45px] h-[45px] mb-2"
          />
          <span className="text-white text-sm">{awayTeam.name}</span>
        </button>
        <span className={`mt-2 text-xl min-w-[70px] text-center
          ${awayTeam.voteCount > homeTeam.voteCount 
            ? 'text-[#FFC736] font-bold' 
            : 'text-white/70'}`}
        >
          {awayTeam.voteCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
