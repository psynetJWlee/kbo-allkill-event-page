// src/components/members/MemberCard.tsx

import React from 'react';
import type { Member } from '@/types/member';

interface MemberCardProps {
  nickname: Member['nickname'];
  profileImage?: Member['profileImage'];
  amount: Member['amount'];
}

const MemberCard: React.FC<MemberCardProps> = ({
  nickname,
  profileImage = '/placeholder.svg',
  amount
}) => {
  return (
    <div className="member-card flex justify-between items-center w-full px-4 py-2 border rounded">
      
      {/* 좌측: 프로필 아이콘 + 닉네임 */}
      <div className="flex items-center space-x-2">
        <img
          src={profileImage}
          alt={`${nickname} 프로필`}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-[20px] text-[#FFFFFF]">{nickname}</span>
      </div>
      
      {/* 우측: 당첨 금액 */}
      <span className="text-[30px] font-bold text-[#FFC736]">
        {amount.toLocaleString()}원
      </span>
    </div>
  );
};

export default MemberCard;
