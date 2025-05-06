
import React from 'react';
import { Button } from "@/components/ui/button";
import { yesterdayResults } from '@/data/kboTeamData';

const YesterdayResults: React.FC = () => {
  return (
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
  );
};

export default YesterdayResults;
