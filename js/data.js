// KBO team logo URLs
const teamLogos = {
  "KT": "https://ssl.gstatic.com/onebox/media/sports/logos/LUZj3ojt_H6lYisolvQ2pg_48x48.png",
  "LG": "https://ssl.gstatic.com/onebox/media/sports/logos/3NqgO_dpTThWu3KBf600tg_48x48.png",
  "한화": "https://ssl.gstatic.com/onebox/media/sports/logos/pq5JUk7H0b6KX5Wi8M0xbA_48x48.png",
  "두산": "https://ssl.gstatic.com/onebox/media/sports/logos/AP_sE5nmR8ckhs_zEhDzEg_48x48.png",
  "KIA": "https://ssl.gstatic.com/onebox/media/sports/logos/psd7z7tnBo7SD8f_Fxs-yg_48x48.png",
  "키움": "https://ssl.gstatic.com/onebox/media/sports/logos/BXbvDpPIJZ_HpPL4qikxNg_48x48.png",
  "NC": "https://ssl.gstatic.com/onebox/media/sports/logos/dDCbStDchWQktsZf2swYyA_48x48.png",
  "삼성": "https://ssl.gstatic.com/onebox/media/sports/logos/c_Jn4jW-NOwRtnGE7uQRAA_48x48.png",
  "SSG": "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png",
  "롯데": "https://ssl.gstatic.com/onebox/media/sports/logos/cGrvIuBYzj4D6KFLPV1MBg_48x48.png",
  "SK": "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png"
};

// Winner members data
const members = [
  { id: 1, nickname: "고량뉴스", profileImage: "/image/profile.jpg", amount: 50000, date: '2025-07-01' },
  { id: 2, nickname: "컴오라파", profileImage: "/image/event-emoticon.gif", amount: 1000000, date: '2025-07-01' },
  { id: 3, nickname: "홈런왕김탁구탁구", profileImage: "/image/giphy.gif", amount: 888888, date: '2025-07-01' },
  { id: 4, nickname: "엘지트윈스", profileImage: "/image/giphy2.gif", amount: 50000, date: '2025-07-01' },
  { id: 5, nickname: "두산베어준", profileImage: "/image/giphy3.gif", amount: 50000, date: '2025-07-01' },
  { id: 6, nickname: "라스돌해라", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 7, nickname: "다이노스", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 8, nickname: "래랜라", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 9, nickname: "하이고", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 10, nickname: "올림픽ㄱㄱ", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 11, nickname: "2고량뉴스", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 12, nickname: "2컴오라파", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 13, nickname: "2홈런왕김탁구", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 14, nickname: "2엘지트윈스", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 15, nickname: "2두산베어준", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 16, nickname: "2라스돌해라", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 17, nickname: "2다이노스", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 18, nickname: "2래랜라", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 19, nickname: "2하이고", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  { id: 20, nickname: "2올림픽ㄱㄱ", profileImage: "/image/profile.png", amount: 50000, date: '2025-07-01' },
  ...Array.from({length: 5}, (_, i) => ({
    id: i + 21,
    nickname: `유저${i + 21}`,
    profileImage: "/image/profile.png",
    amount: 50000,
    date: '2025-07-01'
  }))
];

// Mock data for ranking list (500명으로 확장)
const totalrankingData = [
  ...Array.from({length: 97}, (_, i) => ({
    rank: i + 1,
    name: `랭킹${i + 1}`,
    profileImg: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    streak: (i % 5) + 1,
    prize: 1000000 * (97 - i),
    isMe: i === 12 // 13번째(내닉네임)만 true, 나머지는 false
  }))
];

// Prize history data (최근 500일, amount +50000)
const prizeHistory = [
  { date: "2024-06-11", amount: 50000, history: "상금 지급 신청" },
  { date: "2024-06-10", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-09", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-08", amount: 100000, history: "상금 지급 신청" },
  { date: "2024-06-07", amount: -100000, history: "상금 지급 완료" },
  { date: "2024-06-06", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-05", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-04", amount: 200000, history: "상금 지급 신청" },
  { date: "2024-06-03", amount: -200000, history: "올킬 당첨" },
  { date: "2024-06-02", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-01", amount: 50000, history: "올킬 당첨" },
  { date: "2024-05-31", amount: 50000, history: "지급 정보 불일치" },
  { date: "2024-05-30", amount: 150000, history: "상금 지급 신청" },
  { date: "2024-05-29", amount: -150000, history: "상금 지급 완료" },
  { date: "2024-05-28", amount: 50000, history: "올킬 당첨" }
];

// User data (섹션별 currentPage, totalPages로 분리)
const userData = {
  nickname: "풀스택기획자라니",
  totalAmount: 10000,
  
  // 각 섹션별 페이지 상태 분리
  myPrize: {
    currentPage: 1,
    totalPages: 3
  },
  winners: {
    currentPage: 1,
    totalPages: 3
  }
};

// Event completion data
const eventCompletionData = {
  totalPrizeAmount: 30000000,    // 누적 총 상금: 30,000,000원
  totalParticipants: 547388      // 누적 총 참여 인원: 547,388명
};
