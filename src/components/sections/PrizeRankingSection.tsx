
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

      <style jsx>{`
        .prize-ranking-section {
          background-color: #00283F;
          margin: 0 10px;
          border-radius: 12px;
          padding: 30px 16px;
        }
        
        .ranking-container {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ranking-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        
        .ranking-header .title {
          display: inline-block;
          font-size: 30px;
          font-weight: bold;
          color: #FFFFFF;
          position: relative;
          margin-right: 30px;
        }
        
        .ranking-header .title::after {
          content: '';
          display: block;
          width: 100%;
          height: 1.5px;
          background: #FFC736;
          margin: 5px 0;
        }
        
        .my-ranking {
          display: flex;
          align-items: center;
          margin-left: auto;
        }
        
        .my-ranking .label {
          font-size: 16px;
          color: #FFFFFF;
          opacity: 0.7;
          margin-right: 8px;
        }
        
        .my-ranking .rank {
          font-size: 16px;
          color: #FFFFFF;
          margin-right: 8px;
        }
        
        .my-ranking .icon {
          width: 10px;
          height: 12px;
          color: #FFFFFF;
        }
        
        .ranking-tabs {
          display: inline-flex;
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .ranking-tabs .tab {
          font-size: 16px;
          padding: 8px 20px;
          transition: background 0.2s;
          cursor: pointer;
        }
        
        .ranking-tabs .tab.active {
          background: #FFFFFF;
          color: #00283F;
        }
        
        .ranking-tabs .tab:not(.active) {
          background: #00283F;
          color: #FFFFFF;
        }
        
        .date-range {
          font-size: 14px;
          color: #FFFFFF;
          opacity: 0.7;
          margin-top: 8px;
        }
        
        .ranking-list {
          margin-top: 16px;
        }
        
        .ranking-list .item {
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          margin-top: 8px;
          padding: 12px;
        }
        
        .ranking-list .item.is-me {
          border: 3px solid #FFFFFF;
        }
        
        .rank-number {
          width: 32px;
          text-align: center;
          font-size: 16px;
          color: #FFFFFF;
          opacity: 0.7;
        }
        
        .rank-number.top-rank {
          font-size: 20px;
          color: #FFC700;
          opacity: 1;
        }
        
        .profile-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          margin-left: 13px;
          object-fit: cover;
        }
        
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 7px;
          flex: 1;
        }
        
        .nickname {
          font-size: 15px;
          color: #FFFFFF;
        }
        
        .streak {
          font-size: 14px;
          color: #FFC736;
          opacity: 0.9;
          margin-top: 2px;
        }
        
        .prize {
          font-size: 15px;
          color: #FFC736;
          text-align: right;
          margin-left: auto;
        }
        
        .ranking-note {
          font-size: 12px;
          color: #FFFFFF;
          opacity: 0.7;
          text-align: center;
          margin-top: 16px;
          margin-bottom: 0;
          line-height: 1.4;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .ranking-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .my-ranking {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}</style>
    </section>
  );
};

