
import React, { useState } from 'react';
import { EventTitle } from '@/components/sections/EventTitle';
import { WinnersSection } from '@/components/sections/WinnersSection';
import { DateNavigation } from '@/components/DateNavigation';
import { MyPrizeSection } from '@/components/sections/MyPrizeSection';
import { PrizeRankingSection } from '@/components/sections/PrizeRankingSection';
import { EventDescriptionSection } from '@/components/sections/EventDescriptionSection';
import { TeamSelectionSection } from '@/components/sections/TeamSelectionSection';

const Index = () => {
  const [currentDay, setCurrentDay] = useState(26);
  const REAL_TODAY = 26;

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
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-[353px] mx-auto">
        <EventTitle />
        <WinnersSection />
        <TeamSelectionSection 
          currentDay={currentDay}
          realToday={REAL_TODAY}
          onPrevDate={handlePrevDate}
          onNextDate={handleNextDate}
          onDateClick={handleDateClick}
        />
        <MyPrizeSection />
        <PrizeRankingSection />
        <EventDescriptionSection />
      </div>
    </div>
  );
};

export default Index;
