
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink 
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PrizeHistory {
  date: string;
  amount: number;
}

export const MyPrizeSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const nickname = "닉네임";
  const totalAmount = 150000;
  
  // Mock prize history data
  const prizeHistory: PrizeHistory[] = [
    { date: "2024-05-18", amount: 50000 },
    { date: "2024-05-15", amount: 50000 },
    { date: "2024-05-10", amount: 50000 }
  ];
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <section className="w-full bg-[#003B5D] py-[20px]">
      <div className="mx-[24px]">
        {/* Title Section - Using the new CSS class */}
        <div className="flex flex-col items-center">
          <h2 className="my-prize-title">
            My 상금
          </h2>
        </div>
        
        {/* Prize Group - With background color */}
        <div className="flex flex-col border border-white rounded-[5px] px-[16px] py-[12px] mb-[27px] bg-[#00283C]">
          {/* Member Info - Horizontal layout with precise spacing */}
          <div className="member-info flex flex-row items-center mb-[10px]">
            <Avatar className="h-[32px] w-[32px]">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
            <div className="flex flex-row items-center">
              <p className="text-[20px] text-white ml-[10px]">{nickname}</p>
              <p className="text-[14px] text-white ml-[5px]">님 보유상금</p>
            </div>
          </div>
          
          {/* Amount */}
          <p className="prize-amount text-[30px] text-white mb-[10px]">{formatNumber(totalAmount)} 원</p>
          
          {/* Request Button - Full width with increased border radius */}
          <Button 
            className="bg-[#FFD700] text-[#121212] text-[24px] w-full rounded-[20px] px-4 py-2 hover:bg-[#FFD700]/90"
          >
            <span className="font-bold">상금 지급 신청</span>
          </Button>
        </div>
        
        {/* Prize History */}
        <div className="prize-history">
          {/* Summary */}
          <div className="flex justify-between mb-[10px]">
            <p className="text-[16px] text-white font-bold">상금 획득 내역 (₩)</p>
            <p className="total-prize text-[20px] text-[#FFD700] font-bold">누적 {formatNumber(totalAmount)}</p>
          </div>
          
          {/* List */}
          <div className="mb-[46px]">
            {prizeHistory.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <p className="text-[14px] text-white opacity-70">{item.date}</p>
                <p className="daily-prize text-[20px] text-[#FFD700] font-bold">{formatNumber(item.amount)}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationLink
                  onClick={handlePrevPage}
                  className={`w-[30px] h-[30px] rounded-[5px] text-[14px] flex items-center justify-center
                    ${currentPage === 1 
                      ? 'bg-black/20 border border-white/20 text-white/50 pointer-events-none' 
                      : 'bg-black/20 border border-white/20 text-white'}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              
              {/* Page number buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    className={`w-[30px] h-[30px] rounded-[5px] text-[14px] flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-white text-[#002032]'
                        : 'bg-black/20 border border-white/20 text-white'
                    }`}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {/* Next button */}
              <PaginationItem>
                <PaginationLink
                  onClick={handleNextPage}
                  className={`w-[30px] h-[30px] rounded-[5px] text-[14px] flex items-center justify-center
                    ${currentPage === totalPages 
                      ? 'bg-black/20 border border-white/20 text-white/50 pointer-events-none' 
                      : 'bg-black/20 border border-white/20 text-white'}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};
