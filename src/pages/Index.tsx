
import React from 'react';
import { EventTitle } from '@/components/sections/EventTitle';
import { WinnersSection } from '@/components/sections/WinnersSection';
import { MyPrizeSection } from '@/components/sections/MyPrizeSection';
import { PrizeRankingSection } from '@/components/sections/PrizeRankingSection';
import { EventDescriptionSection } from '@/components/sections/EventDescriptionSection';
import TeamSelectionSection from '@/components/sections/TeamSelectionSection';

const Index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white" id="main-container">
      <div className="max-w-[353px] mx-auto">
        {/* 1. Event Title Section */}
        <EventTitle />

        {/* 2. Today's Winners Section */}
        <WinnersSection />

        {/* 3. KBO Team Selection Section */}
        <section className="h-[950px] bg-[#121212]" id="kbo-selection-container">
          {/* Team Selection Section with vanilla JS implementation */}
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
