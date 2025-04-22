
import React from 'react';

interface DateNavigationProps {
  currentDay: number;
  realToday: number;
  onPrevDate: () => void;
  onNextDate: () => void;
  onDateClick: (day: number) => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  currentDay,
  realToday,
  onPrevDate,
  onNextDate,
  onDateClick
}) => {
  return (
    <div className="flex items-center justify-between px-[21px] h-[50px] text-white">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={onPrevDate}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-[15px] h-[15px] border-y-[7.5px] border-y-transparent border-r-[10px] border-r-white"></div>
        </div>
        <span 
          className="text-[16px] ml-[18px]"
          onClick={(e) => {
            e.stopPropagation();
            onDateClick(currentDay - 1);
          }}
        >
          {currentDay - 1}
        </span>
      </div>
      <span className="text-[16px] font-bold">
        {currentDay === realToday ? 'Today' : currentDay}
      </span>
      <div 
        className="flex items-center cursor-pointer"
        onClick={onNextDate}
      >
        <span 
          className="text-[16px] mr-[18px]"
          onClick={(e) => {
            e.stopPropagation();
            onDateClick(currentDay + 1);
          }}
        >
          {currentDay + 1}
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-[15px] h-[15px] border-y-[7.5px] border-y-transparent border-l-[10px] border-l-white"></div>
        </div>
      </div>
    </div>
  );
};
