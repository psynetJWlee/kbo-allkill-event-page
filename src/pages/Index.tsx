
import React, { useState, useEffect } from 'react';
import MemberList from '@/components/MemberList';
import { EventTitle } from '@/components/sections/EventTitle';
import { WinnersSection } from '@/components/sections/WinnersSection';
import { DateNavigation } from '@/components/DateNavigation';
import { MyPrizeSection } from '@/components/sections/MyPrizeSection';
import { PrizeRankingSection } from '@/components/sections/PrizeRankingSection';
import { EventDescriptionSection } from '@/components/sections/EventDescriptionSection';
import TeamSelectionSection from '@/components/sections/TeamSelectionSection';

const Index = () => {
  const [currentDay, setCurrentDay] = useState(26);
  const REAL_TODAY = 26; // Constant to track the actual today's date

  const handlePrevDate = () => {
    setCurrentDay(currentDay - 1);
  };

  const handleNextDate = () => {
    setCurrentDay(currentDay + 1);
  };

  const handleDateClick = (day: number) => {
    setCurrentDay(day);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white" id="main-container">
      <div className="w-[353px] mx-auto">
        {/* 1. Event Title Section */}
        <EventTitle />

        {/* 2. Today's Winners Section */}
        <WinnersSection />

        {/* 3. KBO Team Selection Section */}
        <section className="h-[912px] w-full bg-[#121212]" id="kbo-selection-container">
          <DateNavigation 
            currentDay={currentDay}
            realToday={REAL_TODAY}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            onDateClick={handleDateClick}
          />
          
          {/* Add the Team Selection Section below the Date Navigation */}
          <TeamSelectionSection />
        </section>

        {/* 4. My Prize Section */}
        <MyPrizeSection />

        {/* 5. Prize Ranking Section */}
        <PrizeRankingSection />

        {/* 6. Event Description Section */}
        <EventDescriptionSection />
      </div>
    </div>
  );
};

export default Index;
