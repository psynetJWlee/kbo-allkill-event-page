
import React from 'react';
import MemberList from '@/components/MemberList';

export const WinnersSection: React.FC = () => {
  return (
    <section className="h-[777px] w-full bg-[#004B70] relative">
      <img 
        src="/lovable-uploads/2b49ee10-7baf-4d97-bde0-342af5344c35.png" 
        alt="오늘의 당첨자"
        className="absolute left-[2px] top-[18px]"
      />
      <p className="absolute left-1/2 transform -translate-x-1/2 top-[78px] text-[20px] text-white font-bold">
        총 20명
      </p>
      <MemberList />
    </section>
  );
};
