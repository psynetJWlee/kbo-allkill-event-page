
import React from 'react';

const TeamSelectionSection: React.FC = () => {
  return (
    <div id="team-selection-container">
      {/* Date Navigation */}
      <div id="date-nav" className="flex items-center justify-between px-[21px] h-[50px] text-white">
        <button id="nav-prev" className="text-white">&larr; 25</button>
        <span id="nav-today" className="text-white">Today</span>
        <button id="nav-next" className="text-white">27 &rarr;</button>
      </div>

      {/* Today's Team Selection */}
      <section id="section-today" className="team-selection-section flex flex-col gap-4">
        <h2 className="team-selection-title">올킬 도전!</h2>
        <div id="game-list-today" className="game-list flex flex-col gap-2 px-4">
          {/* Game items will be inserted by vanilla JS */}
        </div>
        <div className="flex justify-center mt-[50px]">
          <button id="submit-allkill-btn" className="submit-btn mx-auto bg-[#FFD700] text-[#121212] font-bold rounded-full h-[87px] w-[calc(100%-70px)] max-w-[400px]">
            올킬 제출
          </button>
        </div>
      </section>

      {/* Yesterday Results */}
      <section id="section-yesterday" className="team-selection-section flex flex-col gap-4" style={{ display: 'none' }}>
        <h2 className="team-selection-title">올킬 결과</h2>
        <div id="game-list-yesterday" className="game-list flex flex-col gap-2 px-4">
          {/* Match results will be inserted by vanilla JS */}
        </div>
        <div className="flex flex-col items-center mt-[50px] mb-[50px]">
          <img src="" alt="도장" className="mb-4 w-[338px] h-[290px]" />
          <button id="btn-yesterday" className="submit-btn mx-auto bg-[#FFD700] text-[#121212] font-bold rounded-full h-[87px] w-[calc(100%-70px)] max-w-[400px]">
            올킬 성공!
          </button>
        </div>
      </section>

      {/* Placeholder for future dates */}
      <section id="section-placeholder" style={{ display: 'none', height: '684.88px' }}>
        {/* Empty placeholder */}
      </section>
    </div>
  );
};

export default TeamSelectionSection;
