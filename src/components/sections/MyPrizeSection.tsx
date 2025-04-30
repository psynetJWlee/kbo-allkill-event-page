
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink 
} from '@/components/ui/pagination';

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
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <section className="w-full bg-[#003B5D] py-[20px]">
      <div className="mx-[24px]">
        {/* Title Section */}
        <h2 className="text-[30px] text-white text-center mb-[30px]">
          My 상금
        </h2>
        <hr className="border-0 border-t-[2px] border-[#FFC736] mb-[30px]" />
        
        {/* Prize Group */}
        <div className="flex items-center justify-between border border-white rounded-[5px] pl-[16px] mb-[27px]">
          {/* Profile Info */}
          <div className="flex items-center">
            <Avatar className="h-[32px] w-[32px] mr-[10px]">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[20px] text-white">{nickname}</p>
              <p className="text-[14px] text-white mt-[5px]">님 보유상금</p>
            </div>
          </div>
          
          {/* Amount */}
          <p className="text-[30px] text-white ml-[8px]">{formatNumber(totalAmount)}</p>
          
          {/* Request Button */}
          <Button 
            className="bg-[#FFD700] text-[#121212] text-[24px] rounded-[5px] px-4 py-2 hover:bg-[#FFD700]/90"
          >
            상금 지급 신청
          </Button>
        </div>
        
        {/* Prize History */}
        <div className="prize-history">
          {/* Summary */}
          <div className="flex justify-between mb-[10px]">
            <p className="text-[16px] text-white">상금 획득 내역</p>
            <p className="text-[20px] text-[#FFD700]">누적 {formatNumber(totalAmount)}</p>
          </div>
          
          {/* List */}
          <div className="mb-[46px]">
            {prizeHistory.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <p className="text-[14px] text-white opacity-70">{item.date}</p>
                <p className="text-[20px] text-[#FFD700]">{formatNumber(item.amount)}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination>
            <PaginationContent>
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
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};
