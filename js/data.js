
// KBO team logo URLs
const teamLogos = {
  "KT": "https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg",
  "LG": "https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg",
  "한화": "https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg",
  "두산": "https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg",
  "KIA": "https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg",
  "키움": "https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2yUy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg",
  "NC": "https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg",
  "삼성": "https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg",
  "SSG": "https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg",
  "롯데": "https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg"
};

// KBO 팀 경기 데이터 (내일)
const kboGames = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, time: "18:00", status: "투표 중" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, time: "18:00", status: "투표 중" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0    }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, time: "18:00", status: "투표 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787  }, time: "18:00", status: "투표 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787  }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, time: "18:00", status: "투표 중" }
];

// Today's game results data
const todayResults = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 }, homeScore: 1, awayScore: 5, status: "종료" },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 }, homeScore: 2, awayScore: 3, status: "종료" },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0    }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 }, homeScore: 4, awayScore: 4, status: "경기 중" },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787  }, homeScore: 10, awayScore: 2, status: "경기 중" },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787  }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 }, homeScore: 1, awayScore: 0, status: "경기 중" }
];

// Yesterday's game results data
const yesterdayResults = [
  { id: 0, homeTeam: { name: "KT", logo: teamLogos.KT, votes: 11, winner: true }, awayTeam: { name: "LG", logo: teamLogos.LG, votes: 5, winner: false }, homeScore: 11, awayScore: 5, status: "종료", correct: true },
  { id: 1, homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 7,  winner: true }, awayTeam: { name: "NC", logo: teamLogos.NC, votes: 2, winner: false }, homeScore: 7,  awayScore: 2, status: "종료", correct: true },
  { id: 2, homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 3,  winner: false }, awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 9, winner: true  }, homeScore: 3,  awayScore: 9, status: "종료", correct: true },
  { id: 3, homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 8,  winner: true }, awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 4, winner: false }, homeScore: 8,  awayScore: 4, status: "종료", correct: true },
  { id: 4, homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 5,  winner: false }, awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 10,winner: true  }, homeScore: 5,  awayScore: 10,status: "종료", correct: true }
];

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
