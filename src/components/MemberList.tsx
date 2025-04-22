
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

type Member = {
  id: number;
  nickname: string;
  profileImage?: string;
  amount: number;
};

const members: Member[] = [
  { id: 1, nickname: "고량뉴스", profileImage: "/lovable-uploads/85ed9ad3-9c97-4322-9410-b661d4cafb48.png", amount: 50000 },
  { id: 2, nickname: "컴오라파", amount: 50000 },
  { id: 3, nickname: "홈런왕김탁구", amount: 50000 },
  { id: 4, nickname: "엘지트윈스", amount: 50000 },
  { id: 5, nickname: "두산베어준", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 6, nickname: "라스돌해라", amount: 50000 },
  { id: 7, nickname: "다이노스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 8, nickname: "래랜라", amount: 50000 },
  { id: 9, nickname: "하이고", amount: 50000 },
  { id: 10, nickname: "올림픽ㄱㄱ", amount: 50000 },
];

const MemberList = () => {
  return (
    <div className="px-3 mt-[15px] space-y-[10px]">
      {members.map((member) => (
        <div 
          key={member.id}
          className="h-[48px] w-[333px] bg-[#003C5A] border border-[#FFFFFF] border-[0.5px] flex items-center rounded-[5px]"
        >
          <div className="ml-[9px]">
            <Avatar className="h-8 w-8">
              <AvatarImage src={member.profileImage} />
              <AvatarFallback>
                <UserRound className="h-6 w-6 text-white" />
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="ml-[12px] text-[20px] text-white">
            {member.nickname}
          </span>
          <span className="ml-auto mr-[9px] text-[30px] text-[#FFC736]">
            {member.amount.toLocaleString()} 원
          </span>
        </div>
      ))}
    </div>
  );
};

export default MemberList;

