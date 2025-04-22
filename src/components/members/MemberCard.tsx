
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

type MemberCardProps = {
  nickname: string;
  profileImage?: string;
  amount: number;
};

const MemberCard = ({ nickname, profileImage, amount }: MemberCardProps) => {
  return (
    <div className="h-[48px] w-[333px] bg-[#003C5A] border border-[#FFFFFF] border-[0.5px] flex items-center rounded-[12px]">
      <div className="ml-[9px]">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profileImage} />
          <AvatarFallback>
            <UserRound className="h-6 w-6 text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <span className="ml-[12px] text-[20px] text-white">
        {nickname}
      </span>
      <span className="ml-auto mr-[9px] text-[30px] text-[#FFC736] font-bold">
        {amount.toLocaleString()} 원
      </span>
    </div>
  );
};

export default MemberCard;
