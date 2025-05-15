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
  "SK": "https://ssl.gstatic.com/onebox/media/sports/logos/171JeGI-4meYHLIoUPjerQ_48x48.png" // SSG / 구SK
};

// 날짜별 경기 데이터
window.matchData = {

  "2025-05-15": [
    {
      gameId: "20250515-0",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기전",
      startTime: "18:00",
      userSelection: "home"
      // 경기전은 score/gameResult/eventResult 없음
    },
    {
      gameId: "20250515-1",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기중",
      startTime: "18:00",
      score: { home: 2, away: 1 },
      userSelection: "away"
      // 경기중은 gameResult/eventResult 없음
    },
    {
      gameId: "20250515-2",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기종료",
      startTime: "18:00",
      score: { home: 2, away: 5 },
      userSelection: "away",
      gameResult: "away",            // away팀 스코어가 높으니 away
      eventResult: "success"         // userSelection === gameResult
    },
    {
      gameId: "20250515-3",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기종료",
      startTime: "18:00",
      score: { home: 5, away: 2 },
      userSelection: "away",
      gameResult: "home",          // home팀 스코어가 높으니 home
      eventResult: "fail"          // userSelection(away) !== gameResult(home)
    },
    {
      gameId: "20250515-4",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기지연",
      startTime: "18:00",
      userSelection: "home"
    },
    {
      gameId: "20250515-5",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기중지",
      startTime: "18:00",
      score: { home: 0, away: 0 },
      userSelection: "away"
    },
    {
      gameId: "20250515-6",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "서스펜드",
      startTime: "18:00",
      userSelection: "home"
    },
    {
      gameId: "20250515-7",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "우천중지",
      startTime: "18:00",
      userSelection: "away"
    },
    {
      gameId: "20250515-8",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1243 },
      away: { teamName: "SK", logo: teamLogos.SK, votes: 4214 },
      status: "경기취소",
      startTime: "18:00",
      userSelection: "home"
    }
  ],
  
  "2025-05-16": [
    {
      gameId: "20250516-0",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1941 },
      away: { teamName: "LG", logo: teamLogos.LG, votes: 3304 },
      status: "pre", 
      startTime: "18:00",
      userSelection: "home",
      eventResult: null
    },
    {
      gameId: "20250516-1",
      home: { teamName: "한화", logo: teamLogos["한화"], votes: 4720 },
      away: { teamName: "NC", logo: teamLogos.NC, votes: 524 },
      status: "pre",
      startTime: "18:00",
      userSelection: "away",
      eventResult: null
    },
    {
      gameId: "20250516-2",
      home: { teamName: "두산", logo: teamLogos["두산"], votes: 0 },
      away: { teamName: "삼성", logo: teamLogos["삼성"], votes: 5245 },
      status: "pre",
      startTime: "18:00",
      userSelection: "away",
      eventResult: null
    },
    {
      gameId: "20250516-3",
      home: { teamName: "KIA", logo: teamLogos.KIA, votes: 4458 },
      away: { teamName: "SSG", logo: teamLogos.SSG, votes: 787 },
      status: "pre",
      startTime: "18:00",
      userSelection: "home",
      eventResult: null
    },
    {
      gameId: "20250516-4",
      home: { teamName: "키움", logo: teamLogos["키움"], votes: 787 },
      away: { teamName: "롯데", logo: teamLogos["롯데"], votes: 4458 },
      status: "pre",
      startTime: "18:00",
      userSelection: "away",
      eventResult: null
    }
  ],
  
  "2025-05-14": [
    {
      gameId: "20250514-0",
      home: { teamName: "KT", logo: teamLogos.KT, votes: 1111 },
      away: { teamName: "LG", logo: teamLogos.LG, votes: 3215 },
      status: "post",
      startTime: "18:00",
      score: { home: 11, away: 5 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250514-1",
      home: { teamName: "한화", logo: teamLogos["한화"], votes: 227 },
      away: { teamName: "NC", logo: teamLogos.NC, votes: 4322 },
      status: "post",
      startTime: "18:00",
      score: { home: 7, away: 2 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250514-2",
      home: { teamName: "두산", logo: teamLogos["두산"], votes: 423 },
      away: { teamName: "삼성", logo: teamLogos["삼성"], votes: 9324 },
      status: "post",
      startTime: "18:00",
      score: { home: 3, away: 9 },
      userSelection: "away",
      eventResult: "fail"
    },
    {
      gameId: "20250514-3",
      home: { teamName: "KIA", logo: teamLogos.KIA, votes: 4218 },
      away: { teamName: "SSG", logo: teamLogos.SSG, votes: 5524 },
      status: "post",
      startTime: "18:00",
      score: { home: 8, away: 4 },
      userSelection: "away",
      eventResult: "fail"
    },
    {
      gameId: "20250514-4",
      home: { teamName: "키움", logo: teamLogos["키움"], votes: 5525 },
      away: { teamName: "롯데", logo: teamLogos["롯데"], votes: 1230 },
      status: "post",
      startTime: "18:00",
      score: { home: 5, away: 10 },
      userSelection: "home",
      eventResult: "success"
    }
  ],
 
  "2025-05-13": [
    {
      gameId: "20250513-0",
      home: { teamName: "LG", logo: teamLogos.LG, votes: 3215 },
      away: { teamName: "KT", logo: teamLogos.KT, votes: 1111 },
      status: "post",
      startTime: "18:00",
      score: { home: 8, away: 3 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250513-1",
      home: { teamName: "NC", logo: teamLogos.NC, votes: 4322 },
      away: { teamName: "한화", logo: teamLogos["한화"], votes: 227 },
      status: "post",
      startTime: "18:00",
      score: { home: 1, away: 6 },
      userSelection: "away",
      eventResult: "success"
    },
    {
      gameId: "20250513-2",
      home: { teamName: "삼성", logo: teamLogos["삼성"], votes: 9324 },
      away: { teamName: "두산", logo: teamLogos["두산"], votes: 423 },
      status: "post",
      startTime: "18:00",
      score: { home: 7, away: 2 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250513-3",
      home: { teamName: "SSG", logo: teamLogos.SSG, votes: 5524 },
      away: { teamName: "KIA", logo: teamLogos.KIA, votes: 4218 },
      status: "post",
      startTime: "18:00",
      score: { home: 3, away: 9 },
      userSelection: "away",
      eventResult: "success"
    },
    {
      gameId: "20250513-4",
      home: { teamName: "롯데", logo: teamLogos["롯데"], votes: 1230 },
      away: { teamName: "키움", logo: teamLogos["키움"], votes: 5525 },
      status: "post",
      startTime: "18:00",
      score: { home: 6, away: 4 },
      userSelection: "home",
      eventResult: "success"
    }
  ],
  
  "2025-05-12": [
    {
      gameId: "20250512-0",
      home: { teamName: "LG", logo: teamLogos.LG, votes: 3215 },
      away: { teamName: "KT", logo: teamLogos.KT, votes: 1111 },
      status: "post",
      startTime: "18:00",
      score: { home: 0, away: 0 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250512-1",
      home: { teamName: "NC", logo: teamLogos.NC, votes: 4322 },
      away: { teamName: "한화", logo: teamLogos["한화"], votes: 227 },
      status: "post",
      startTime: "18:00",
      score: { home: 1, away: 1 },
      userSelection: "away",
      eventResult: "success"
    },
    {
      gameId: "20250512-2",
      home: { teamName: "삼성", logo: teamLogos["삼성"], votes: 9324 },
      away: { teamName: "두산", logo: teamLogos["두산"], votes: 423 },
      status: "post",
      startTime: "18:00",
      score: { home: 7, away: 2 },
      userSelection: "home",
      eventResult: "success"
    },
    {
      gameId: "20250512-3",
      home: { teamName: "SSG", logo: teamLogos.SSG, votes: 5524 },
      away: { teamName: "KIA", logo: teamLogos.KIA, votes: 4218 },
      status: "post",
      startTime: "18:00",
      score: { home: 3, away: 9 },
      userSelection: "away",
      eventResult: "success"
    },
    {
      gameId: "20250512-4",
      home: { teamName: "롯데", logo: teamLogos["롯데"], votes: 1230 },
      away: { teamName: "키움", logo: teamLogos["키움"], votes: 5525 },
      status: "post",
      startTime: "18:00",
      score: { home: 6, away: 4 },
      userSelection: "home",
      eventResult: "success"
    }
  ]
};

// Winner members data
const members = [
  { id: 1, nickname: "고량뉴스", profileImage: "/lovable-uploads/85ed9ad3-9c97-4322-9410-b661d4cafb48.png", amount: 50000 },
  { id: 2, nickname: "컴오라파", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 3, nickname: "홈런왕김탁구", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 4, nickname: "엘지트윈스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 5, nickname: "두산베어준", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 6, nickname: "라스돌해라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 7, nickname: "다이노스", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 8, nickname: "래랜라", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 9, nickname: "하이고", profileImage: "/placeholder.svg", amount: 50000 },
  { id: 10, nickname: "올림픽ㄱㄱ", profileImage: "/placeholder.svg", amount: 50000 },
];

// Default selected teams for today view
const defaultSelectedTeams = {
  0: 'home', // KT
  1: 'away', // NC
  2: 'away', // 삼성
  3: 'home', // KIA
  4: 'home'  // 키움
};

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

// Prize history data
const prizeHistory = [
  { date: "2024-05-18", amount: 50000 },
  { date: "2024-05-15", amount: 50000 },
  { date: "2024-05-10", amount: 50000 }
];

// User data
const userData = {
  nickname: "닉네임",
  totalAmount: 150000,
  currentPage: 1,
  totalPages: 3
};
