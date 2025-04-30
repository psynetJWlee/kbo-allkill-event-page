
import React, { useEffect } from 'react';
import { PersonStanding } from "lucide-react";

export const PrizeRankingSection: React.FC = () => {
  useEffect(() => {
    // Initialize tab switching logic
    const initTabs = () => {
      const tabs = document.querySelectorAll('.ranking-tabs .tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Here you would typically update the ranking list based on the selected tab
          // For now, we're just switching the active state
        });
      });
    };
    
    // Initialize the tabs once the component is mounted
    initTabs();
    
    // Cleanup event listeners on unmount
    return () => {
      const tabs = document.querySelectorAll('.ranking-tabs .tab');
      tabs.forEach(tab => {
        tab.removeEventListener('click', () => {});
      });
    };
  }, []);

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
    <section className="prize-ranking-section">
      <div className="ranking-container">
        {/* 1. 타이틀 영역 */}
        <div className="ranking-header">
          <h2 className="title">상금 랭킹</h2>
          <div className="my-ranking">
            <span className="label">내 랭킹</span>
            <span className="rank">6위 / 5,345</span>
            <PersonStanding className="icon" size={12} />
          </div>
        </div>

        {/* 2. 랭킹 산정 기준 */}
        <div className="ranking-tabs">
          <button className="tab active">주간</button>
          <button className="tab">전체</button>
        </div>
        <p className="date-range">3월 20일 ~ 3월 26일 기준</p>

        {/* 3. 랭킹 리스트 */}
        <ul className="ranking-list">
          {rankingData.map((item) => (
            <li key={item.rank} className={`item ${item.isMe ? 'is-me' : ''}`}>
              <div className={`rank-number ${item.rank <= 3 ? 'top-rank' : ''}`}>
                {item.rank}
              </div>
              <img src={item.profileImg} alt={`${item.name}의 프로필`} className="profile-img" />
              <div className="info">
                <span className="nickname">{item.name}</span>
                <span className="streak">올킬 {item.streak}회</span>
              </div>
              <div className="prize">{formatPrize(item.prize)}</div>
            </li>
          ))}
        </ul>

        {/* 4. 랭킹 선정 안내문구 */}
        <div className="ranking-note">
          * 랭킹은 매일 오전 9시에 업데이트<br/>
          * 동일한 적중 횟수일 경우 먼저 달성한 사용자가 우선 순위
        </div>
      </div>
    </section>
  );
};
