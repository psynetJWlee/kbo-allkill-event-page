
import React, { useState } from 'react';
import { PersonStanding } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const PrizeRankingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'all'>('weekly');

  // Mock data for ranking list
  const rankingData = [
    { rank: 1, name: "올킬챔피언", profileImg: "https://i.pravatar.cc/150?img=1", streak: 5, prize: 1500000, isMe: false },
    { rank: 2, name: "베팅전문가", profileImg: "https://i.pravatar.cc/150?img=2", streak: 4, prize: 1200000, isMe: false },
    { rank: 3, name: "야구의신", profileImg: "https://i.pravatar.cc/150?img=3", streak: 4, prize: 1000000, isMe: false },
    { rank: 4, name: "KBO마스터", profileImg: "https://i.pravatar.cc/150?img=4", streak: 3, prize: 800000, isMe: false },
    { rank: 5, name: "승부사", profileImg: "https://i.pravatar.cc/150?img=5", streak: 3, prize: 700000, isMe: false },
    { rank: 6, name: "야구팬123", profileImg: "https://i.pravatar.cc/150?img=6", streak: 3, prize: 600000, isMe: true },
    { rank: 7, name: "베팅러버", profileImg: "https://i.pravatar.cc/150?img=7", streak: 2, prize: 500000, isMe: false },
    { rank: 8, name: "올킬도전자", profileImg: "https://i.pravatar.cc/150?img=8", streak: 2, prize: 400000, isMe: false },
    { rank: 9, name: "야구매니아", profileImg: "https://i.pravatar.cc/150?img=9", streak: 1, prize: 300000, isMe: false },
    { rank: 10, name: "베팅초보", profileImg: "https://i.pravatar.cc/150?img=10", streak: 1, prize: 200000, isMe: false },
  ];

  const formatPrize = (prize: number): string => {
    return prize.toLocaleString() + '원';
  };

  return (
    <section className="w-full bg-[#00283F] py-[30px] px-[16px]">
      {/* 1. 타이틀 영역 - 중앙 정렬로 변경 */}
      <div className="flex flex-col items-center">
        <h2 className="inline-block text-[30px] font-bold text-white relative after:content-[''] after:block after:w-full after:h-[1.5px] after:bg-[#FFC736] after:mt-[5px]">상금 랭킹</h2>
        
        <p className="text-[16px] text-white opacity-70 mt-[8px]">
          내 랭킹 6위 / 5,345 
          <PersonStanding className="inline-block ml-[8px] w-[10px] h-[12px]" />
        </p>
      </div>

      {/* 2. 랭킹 산정 기준 - shadcn Tabs 컴포넌트 사용 */}
      <div className="flex justify-center mt-[16px] w-full">
        <Tabs 
          defaultValue="weekly" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'weekly' | 'all')}
          className="w-full"
        >
          <TabsList className="bg-transparent border border-white/30 rounded-full h-auto p-[4px] w-full">
            <TabsTrigger 
              value="weekly" 
              className="flex-1 text-[16px] px-[24px] py-[8px] data-[state=active]:bg-white data-[state=active]:text-[#00283F] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-full"
            >
              주간
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="flex-1 text-[16px] px-[24px] py-[8px] data-[state=active]:bg-white data-[state=active]:text-[#00283F] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white rounded-full"
            >
              전체
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <p className="text-center mt-[8px] text-[14px] text-white opacity-70">3월 20일 ~ 3월 26일 기준</p>

      {/* 3. 랭킹 리스트 */}
      <ul className="mt-[16px]">
        {rankingData.map((item) => (
          <li key={item.rank} className={`flex items-center bg-black/20 rounded-[8px] mt-[8px] p-[12px] ${item.isMe ? 'border-[3px] border-white' : ''}`}>
            <div className={`w-[32px] text-center ${item.rank <= 3 ? 'text-[20px] text-[#FFC700]' : 'text-[16px] text-white opacity-70'}`}>
              {item.rank}
            </div>
            <img src={item.profileImg} alt={`${item.name}의 프로필`} className="w-[38px] h-[38px] rounded-full ml-[13px] object-cover" />
            <div className="flex flex-col ml-[7px] flex-1">
              <span className="text-[15px] text-white">{item.name}</span>
              <span className="text-[14px] text-[#FFC736] opacity-90 mt-[2px]">올킬 {item.streak}회</span>
            </div>
            <div className="text-[15px] text-[#FFC736] text-right ml-auto">{formatPrize(item.prize)}</div>
          </li>
        ))}
      </ul>

      {/* 4. 랭킹 선정 안내문구 */}
      <div className="text-[12px] text-white opacity-70 text-center mt-[16px]">
        * 랭킹은 매일 오전 9시에 업데이트<br/>
        * 동일한 적중 횟수일 경우 먼저 달성한 사용자가 우선 순위
      </div>
    </section>
  );
};
