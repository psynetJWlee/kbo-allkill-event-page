
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

  useEffect(() => {
    // After the component mounts, dispatch a custom event to inform vanilla JS 
    // about the initial state
    const initialStateEvent = new CustomEvent('reactDateChanged', {
      detail: { currentDay, realToday: REAL_TODAY }
    });
    
    document.dispatchEvent(initialStateEvent);
  }, []);

  const handlePrevDate = () => {
    const newDay = currentDay - 1;
    setCurrentDay(newDay);
    
    // Dispatch custom event for vanilla JS to handle
    const event = new CustomEvent('reactDateChanged', {
      detail: { currentDay: newDay, realToday: REAL_TODAY }
    });
    document.dispatchEvent(event);
  };

  const handleNextDate = () => {
    const newDay = currentDay + 1;
    setCurrentDay(newDay);
    
    // Dispatch custom event for vanilla JS to handle
    const event = new CustomEvent('reactDateChanged', {
      detail: { currentDay: newDay, realToday: REAL_TODAY }
    });
    document.dispatchEvent(event);
  };

  const handleDateClick = (day: number) => {
    setCurrentDay(day);
    
    // Dispatch custom event for vanilla JS to handle
    const event = new CustomEvent('reactDateChanged', {
      detail: { currentDay: day, realToday: REAL_TODAY }
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white" id="main-container">
      <div className="max-w-[353px] mx-auto">
        {/* 1. Event Title Section */}
        <EventTitle />

        {/* 2. Today's Winners Section */}
        <WinnersSection />

        {/* 3. KBO Team Selection Section */}
        <section className="h-[950px] bg-[#121212]" id="kbo-selection-container">
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
