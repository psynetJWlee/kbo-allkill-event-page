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
  { id: 1, nickname: "고량뉴스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 2, nickname: "컴오라파", profileImage: "/image/placeholder.svg", amount: 1000000 },
  { id: 3, nickname: "홈런왕김탁구탁구", profileImage: "/image/placeholder.svg", amount: 888888 },
  { id: 4, nickname: "엘지트윈스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 5, nickname: "두산베어준", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 6, nickname: "라스돌해라", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 7, nickname: "다이노스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 8, nickname: "래랜라", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 9, nickname: "하이고", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 10, nickname: "올림픽ㄱㄱ", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 11, nickname: "2고량뉴스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 12, nickname: "2컴오라파", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 13, nickname: "2홈런왕김탁구", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 14, nickname: "2엘지트윈스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 15, nickname: "2두산베어준", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 16, nickname: "2라스돌해라", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 17, nickname: "2다이노스", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 18, nickname: "2래랜라", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 19, nickname: "2하이고", profileImage: "/image/placeholder.svg", amount: 50000 },
  { id: 20, nickname: "2올림픽ㄱㄱ", profileImage: "/image/placeholder.svg", amount: 50000 },
];

// Mock data for ranking list (30명으로 확장)
const totalrankingData = [
  // 1~10 기존 동일
  { rank: 1, name: "베팅초", profileImg: "https://i.pravatar.cc/150?img=1", streak: 5, prize: 91500000, isMe: false },
  { rank: 2, name: "전문가", profileImg: "https://i.pravatar.cc/150?img=2", streak: 4, prize: 81200000, isMe: false },
  { rank: 3, name: "야구신", profileImg: "https://i.pravatar.cc/150?img=3", streak: 4, prize: 71000000, isMe: false },
  { rank: 4, name: "KBO스터", profileImg: "https://i.pravatar.cc/150?img=4", streak: 3, prize: 6800000, isMe: false },
  { rank: 5, name: "승부", profileImg: "https://i.pravatar.cc/150?img=5", streak: 3, prize: 5700000, isMe: false },
  { rank: 6, name: "야구팬5123", profileImg: "https://i.pravatar.cc/150?img=6", streak: 3, prize: 4600000, isMe: false },
  { rank: 7, name: "베팅5러버", profileImg: "https://i.pravatar.cc/150?img=7", streak: 2, prize: 3500000, isMe: false },
  { rank: 8, name: "올킬123도전자", profileImg: "https://i.pravatar.cc/150?img=8", streak: 2, prize: 2400000, isMe: false },
  { rank: 9, name: "야구55매니아", profileImg: "https://i.pravatar.cc/150?img=9", streak: 1, prize: 1300000, isMe: false },
  { rank: 10, name: "베팅고수베팅초보", profileImg: "https://i.pravatar.cc/150?img=10", streak: 1, prize: 1200000, isMe: false },
  { rank: 11, name: "랭킹11", profileImg: "https://i.pravatar.cc/150?img=11", streak: 2, prize: 1100000, isMe: false },
  { rank: 12, name: "랭킹12", profileImg: "https://i.pravatar.cc/150?img=12", streak: 3, prize: 1000000, isMe: false },
  { rank: 13, name: "내닉네임", profileImg: "/image/placeholder.svg", streak: 3, prize: 900000, isMe: true },
  { rank: 14, name: "랭킹14", profileImg: "https://i.pravatar.cc/150?img=14", streak: 1, prize: 800000, isMe: false },
  { rank: 15, name: "랭킹15", profileImg: "https://i.pravatar.cc/150?img=15", streak: 2, prize: 700000, isMe: false },
  { rank: 16, name: "랭킹16", profileImg: "https://i.pravatar.cc/150?img=16", streak: 4, prize: 600000, isMe: false },
  { rank: 17, name: "랭킹17", profileImg: "https://i.pravatar.cc/150?img=17", streak: 3, prize: 500000, isMe: false },
  { rank: 18, name: "랭킹18", profileImg: "https://i.pravatar.cc/150?img=18", streak: 2, prize: 400000, isMe: false },
  { rank: 19, name: "랭킹19", profileImg: "https://i.pravatar.cc/150?img=19", streak: 1, prize: 300000, isMe: false },
  { rank: 20, name: "랭킹20", profileImg: "https://i.pravatar.cc/150?img=20", streak: 5, prize: 200000, isMe: false },
  { rank: 21, name: "랭킹21", profileImg: "https://i.pravatar.cc/150?img=21", streak: 3, prize: 100000, isMe: false },
  { rank: 22, name: "랭킹22", profileImg: "https://i.pravatar.cc/150?img=22", streak: 2, prize: 95000, isMe: false },
  { rank: 23, name: "랭킹23", profileImg: "https://i.pravatar.cc/150?img=23", streak: 3, prize: 90000, isMe: false },
  { rank: 24, name: "랭킹24", profileImg: "https://i.pravatar.cc/150?img=24", streak: 4, prize: 85000, isMe: false },
  { rank: 25, name: "랭킹25", profileImg: "https://i.pravatar.cc/150?img=25", streak: 2, prize: 80000, isMe: false },
  { rank: 26, name: "랭킹26", profileImg: "https://i.pravatar.cc/150?img=26", streak: 1, prize: 75000, isMe: false },
  { rank: 27, name: "랭킹27", profileImg: "https://i.pravatar.cc/150?img=27", streak: 2, prize: 70000, isMe: false },
  { rank: 28, name: "랭킹28", profileImg: "https://i.pravatar.cc/150?img=28", streak: 3, prize: 65000, isMe: false },
  { rank: 29, name: "랭킹29", profileImg: "https://i.pravatar.cc/150?img=29", streak: 1, prize: 60000, isMe: false },
  { rank: 30, name: "랭킹30", profileImg: "https://i.pravatar.cc/150?img=30", streak: 2, prize: 55000, isMe: false }
];

// Prize history data
const prizeHistory = [
  { date: "2024-05-18", amount: +50000 },
  { date: "2024-05-15", amount: +50000 },
  { date: "2024-05-10", amount: +50000 },
  { date: "2024-05-09", amount: +50000 },
  { date: "2024-05-08", amount: +50000 },
  { date: "2024-05-07", amount: +50000 },
  { date: "2024-05-06", amount: +50000 },
  { date: "2024-05-05", amount: +50000 },
  { date: "2024-05-04", amount: +50000 },
  { date: "2024-05-03", amount: -300000 },
  { date: "2024-05-02", amount: +50000 },
  { date: "2024-05-01", amount: +50000 },
  { date: "2024-04-29", amount: +50000 },
  { date: "2024-04-24", amount: +50000 },
  { date: "2024-04-23", amount: +50000 },
  { date: "2024-04-20", amount: +50000 }
];

// User data (섹션별 currentPage, totalPages로 분리)
const userData = {
  nickname: "풀스택기획자라니",
  totalAmount: 4500000,
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
