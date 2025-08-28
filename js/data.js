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
  // 8월 20일 데이터
  { id: 1, nickname: "고량뉴스", profileImage: "/image/profile.jpg", amount: 50000, date: '2025-08-20' },
  { id: 2, nickname: "컴오라파", profileImage: "/image/event-emoticon.gif", amount: 1000000, date: '2025-08-20' },
  { id: 3, nickname: "홈런왕김탁구탁구", profileImage: "/image/giphy.gif", amount: 888888, date: '2025-08-20' },
  { id: 4, nickname: "엘지트윈스", profileImage: "/image/giphy2.gif", amount: 50000, date: '2025-08-20' },
  { id: 5, nickname: "두산베어준", profileImage: "/image/giphy3.gif", amount: 50000, date: '2025-08-20' },
  { id: 6, nickname: "라스돌해라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-20' },
  { id: 7, nickname: "다이노스", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-20' },
  { id: 8, nickname: "래랜라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-20' },
  { id: 9, nickname: "하이고", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-20' },
  { id: 10, nickname: "올림픽ㄱㄱ", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-20' },
  ...Array.from({length: 200}, (_, i) => ({
    id: i + 11,
    nickname: `유저${i + 11}`,
    profileImage: "/image/profile.png",
    amount: 50000,
    date: '2025-08-20'
  })),

  // 8월 21일 데이터
  { id: 211, nickname: "김치전사", profileImage: "/image/profile.jpg", amount: 75000, date: '2025-08-21' },
  { id: 212, nickname: "야구왕자", profileImage: "/image/event-emoticon.gif", amount: 1500000, date: '2025-08-21' },
  { id: 213, nickname: "홈런킹", profileImage: "/image/giphy.gif", amount: 666666, date: '2025-08-21' },
  { id: 214, nickname: "삼성라이온즈", profileImage: "/image/giphy2.gif", amount: 80000, date: '2025-08-21' },
  { id: 215, nickname: "롯데자이언츠", profileImage: "/image/giphy3.gif", amount: 60000, date: '2025-08-21' },
  ...Array.from({length: 180}, (_, i) => ({
    id: i + 216,
    nickname: `야구팬${i + 216}`,
    profileImage: "/image/profile.png",
    amount: 45000 + (i % 5) * 1000,
    date: '2025-08-21'
  })),

  // 8월 22일 데이터
  { id: 396, nickname: "스포츠마스터", profileImage: "/image/profile.jpg", amount: 120000, date: '2025-08-22' },
  { id: 397, nickname: "올킬킹", profileImage: "/image/event-emoticon.gif", amount: 2000000, date: '2025-08-22' },
  { id: 398, nickname: "베이스볼러", profileImage: "/image/giphy.gif", amount: 777777, date: '2025-08-22' },
  { id: 399, nickname: "한화이글스", profileImage: "/image/giphy2.gif", amount: 90000, date: '2025-08-22' },
  { id: 400, nickname: "KT위즈", profileImage: "/image/giphy3.gif", amount: 70000, date: '2025-08-22' },
  ...Array.from({length: 220}, (_, i) => ({
    id: i + 401,
    nickname: `올킬러${i + 401}`,
    profileImage: "/image/profile.png",
    amount: 40000 + (i % 6) * 2000,
    date: '2025-08-22'
  })),

  // 8월 23일 데이터
  { id: 621, nickname: "야구신동", profileImage: "/image/profile.jpg", amount: 95000, date: '2025-08-23' },
  { id: 622, nickname: "올킬마스터", profileImage: "/image/event-emoticon.gif", amount: 1800000, date: '2025-08-23' },
  { id: 623, nickname: "홈런헌터", profileImage: "/image/giphy.gif", amount: 555555, date: '2025-08-23' },
  { id: 624, nickname: "SSG랜더스", profileImage: "/image/giphy2.gif", amount: 85000, date: '2025-08-23' },
  { id: 625, nickname: "NC다이노스", profileImage: "/image/giphy3.gif", amount: 65000, date: '2025-08-23' },
  ...Array.from({length: 190}, (_, i) => ({
    id: i + 626,
    nickname: `야구러버${i + 626}`,
    profileImage: "/image/profile.png",
    amount: 35000 + (i % 7) * 1500,
    date: '2025-08-23'
  })),

  // 8월 24일 데이터 (기존 8월 2일 데이터를 변경)
  { id: 816, nickname: "고량뉴스", profileImage: "/image/profile.jpg", amount: 50000, date: '2025-08-24' },
  { id: 817, nickname: "컴오라파", profileImage: "/image/event-emoticon.gif", amount: 1000000, date: '2025-08-24' },
  { id: 818, nickname: "홈런왕김탁구탁구", profileImage: "/image/giphy.gif", amount: 888888, date: '2025-08-24' },
  { id: 819, nickname: "엘지트윈스", profileImage: "/image/giphy2.gif", amount: 50000, date: '2025-08-24' },
  { id: 820, nickname: "두산베어준", profileImage: "/image/giphy3.gif", amount: 50000, date: '2025-08-24' },
  { id: 821, nickname: "라스돌해라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 822, nickname: "다이노스", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 823, nickname: "래랜라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 824, nickname: "하이고", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 825, nickname: "올림픽ㄱㄱ", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 826, nickname: "2고량뉴스", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 827, nickname: "2컴오라파", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 828, nickname: "2홈런왕김탁구", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 829, nickname: "2엘지트윈스", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 830, nickname: "2두산베어준", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 831, nickname: "2라스돌해라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 832, nickname: "2다이노스", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 833, nickname: "2래랜라", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 834, nickname: "2하이고", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  { id: 835, nickname: "2올림픽ㄱㄱ", profileImage: "/image/profile.png", amount: 50000, date: '2025-08-24' },
  ...Array.from({length: 1111}, (_, i) => ({
    id: i + 836,
    nickname: `유저${i + 836}`,
    profileImage: "/image/profile.png",
    amount: 50000,
    date: '2025-08-24'
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
  { date: "2024-06-07", amount: -100000, history: "상금 지급 완료" },
  { date: "2024-06-06", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-05", amount: 50000, history: "올킬 당첨" },  
  { date: "2024-06-03", amount: -200000, history: "상금 지급 완료" },
  { date: "2024-06-02", amount: 50000, history: "올킬 당첨" },
  { date: "2024-06-01", amount: 50000, history: "올킬 당첨" },  
  { date: "2024-05-29", amount: -150000, history: "상금 지급 완료" },
  { date: "2024-05-28", amount: 50000, history: "올킬 당첨" }
];

// User data (섹션별 currentPage, totalPages로 분리)
const userData = {
  nickname: "풀스택기획자라니",
  totalAmount: 0,
  
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
