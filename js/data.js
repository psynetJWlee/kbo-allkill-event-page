
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
  { id: 1, nickname: "고량뉴스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 2, nickname: "컴오라파", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 3, nickname: "홈런왕김탁구탁구", profileImage: "/placeholder.svg", amount: 888888 },
  { id: 4, nickname: "엘지트윈스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 5, nickname: "두산베어준", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 6, nickname: "라스돌해라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 7, nickname: "다이노스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 8, nickname: "래랜라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 9, nickname: "하이고", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 10, nickname: "올림픽ㄱㄱ", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 11, nickname: "2고량뉴스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 12, nickname: "2컴오라파", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 13, nickname: "2홈런왕김탁구", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 14, nickname: "2엘지트윈스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 15, nickname: "2두산베어준", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 16, nickname: "2라스돌해라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 17, nickname: "2다이노스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 18, nickname: "2래랜라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 19, nickname: "2하이고", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 20, nickname: "2올림픽ㄱㄱ", profileImage: "/placeholder.svg", amount: 50000 },
];

// Mock data for ranking list
const weeklyrankingData = [
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

const totalrankingData = [
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

// User data
const userData = {
  nickname: "닉네임",
  totalAmount: 4500000,
  currentPage: 1,
  totalPages: 3
};
