
import React from 'react';
import MemberList from '@/components/MemberList';

export const WinnersSection: React.FC = () => {
  return (
    <section className="w-full bg-[#004B70] flex flex-col items-center py-6" id="winners-section">
      <div className="w-full flex flex-col items-center relative">
        <img 
          src="/lovable-uploads/2b49ee10-7baf-4d97-bde0-342af5344c35.png" 
          alt="오늘의 당첨자"
          className="mb-4"
        />
        <p className="text-[20px] text-white font-bold mb-6">
          총 20명
        </p>
      </div>
      <div className="w-full">
        <MemberList />
      </div>
    </section>
  );
};
